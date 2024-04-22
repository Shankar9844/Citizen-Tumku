import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  otp: any;
  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private router: Router) { }
  slides = [
    { image: 'assets/icons/icon1 (1).png', caption: 'Single Account Multiple Online Services' },
    { image: 'assets/icons/icon2 (1).png', caption: 'View Transaction History Anytime' },
    { image: 'assets/icons/icon3 (1).png', caption: '100% Secure Online Payment' },
  ];

  currentIndex = 0;
  step: 'getOtp' | 'login' = 'getOtp'; // Initial step is to get OTP
  getOtpForm!: FormGroup;
  loginForm!: FormGroup;
  loading: boolean = false;
  ngOnInit() {
    if (this.loginService.getLoginStatus()) {
      // Redirect to the dashboard if already logged in
      this.router.navigate(['/dashboard']);
    } else {
      // Continue with your existing initialization code
      this.startAutoSlider();
      this.initGetOtpForm();
      this.initLoginForm();
    }
  }

  ngOnDestroy() {

  }

  showSlide(index: number) {
    this.currentIndex = index;

    this.startAutoSlider(); // Restart auto slider
  }

  private startAutoSlider() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000); // Change slide every 5 seconds (adjust as needed)
  }

  initGetOtpForm(): void {
    this.getOtpForm = this.formBuilder.group({
      MobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Password: ['', [Validators.required]]
    });
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      Otp: ['', [Validators.required]],
    });
  }

  onGetOtpSubmit(): void {
    if (this.getOtpForm.valid) {
      this.loading = true;
      const mobileNumber = this.getOtpForm.value.MobileNumber;
     
      this.loginService.SearchUser(mobileNumber).subscribe(
        (res: any) => {
          if (res.ResponceStatusCode === 200) {
            localStorage.setItem('MobNo', res.mobileNo)
            localStorage.setItem('Name', res.FirstName + ' ' + res.LastName);
            
            if(res.Password===this.getOtpForm.value.Password){
              this.getOTP();
            }else{
              this.loading = false;
              Swal.fire({
                icon: 'error',
               title: 'Wrong Password',
               text: 'Please enter valid password',
             });
            }
           
          } else {
            this.loading = false;
            Swal.fire({
               icon: 'error',
              title: 'Not Registered',
              text: 'User is not registered !!',
            });
          }
        })


    }
  }
  otpshow: boolean = false;
  getOTP(): void {
    this.loading = true;
    const mobileNumber = this.getOtpForm.value.MobileNumber;
    this.loginService.getOtp(mobileNumber).subscribe(
      (otp: any) => {
        localStorage.setItem('MobileNo', mobileNumber)
        // Perform logic with the received OTP (e.g., display it, send it to the server, etc.)
        console.log('Received OTP:', otp);
        this.otp = otp.value.toString();
        this.otpshow = true;
        this.loading = false;
        // Show Sweet Alert for successful OTP sending
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent Successfully',
          text: 'OTP has been sent successfully!',
        });

        // Switch to the login step or perform other actions
        this.step = 'login';
        this.getOtpForm.disable(); // Disable the form
      },
      (error) => {
        this.loading = false;
        // Handle errors here if needed
        console.error('Error:', error);
      }
    );
  }
  otpvalid: boolean = false;
  enteredOTP: any;
  onOtpChange(otp: any) {

    if (otp.toString().length == 4) {
      this.otpvalid = true;
    } else {
      this.otpvalid = false;
    }
    this.enteredOTP = otp;
  }
  onLoginSubmit(): void {


    this.loading = true;
    if (this.enteredOTP === this.otp) {
      // Correct OTP, perform actions
      // For example, set loginAuthGuard to true and navigate to other pages
      this.loginService.setLoginStatus(true);

      // You can also navigate to other pages here, for example:
      this.router.navigate(['/OnlineServices']);

    } else {
      // Incorrect OTP, show Sweet Alert
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Incorrect OTP',
        text: 'Please enter the correct OTP.',
      });

    }

  }

  onReset(): void {
    this.getOtpForm.reset();
    this.loginForm.reset();
    this.step = 'getOtp'; // Reset the step to get OTP
  }
}
