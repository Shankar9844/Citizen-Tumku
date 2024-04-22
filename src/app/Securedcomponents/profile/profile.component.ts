import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editProfile: boolean = false;
  Name: any;
  MobileNo: any;
  completionPercentage: number = 0;
  loading: boolean = false;
  name: any;

  constructor(private fb: FormBuilder, public apiService: ApiService) {}

  ngOnInit(): void {
    this.Name = localStorage.getItem('Name');
    this.MobileNo = localStorage.getItem('MobNo');
    this.initiateForm();
    this.getProfilestatus(this.MobileNo);
  }
  getProfilestatus(mobno:any){
    this.apiService.GetPersonalDetail(this.MobileNo).subscribe(
      (res) => {
        if (res.ResponceStatusCode == 200) {
          this.initiateForms(res);
          this.calculateCompletionPercentage(res);
          this.name = res.FirstName;
          this.loading = false;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed To Fetch Details',
          });
          this.loading = false;
        }
      },
      (error) => {
        console.error('Error fetching personal details:', error);
        this.loading = false;
      }
    );
  }
  editprofileedit() {
    this.editProfile = true;
    this.getProfilestatus(this.MobileNo);
  }

  initiateForm() {
    console.log(this.name);
    this.profileForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      MiddleName: [''],
      LastName: ['', [Validators.required]],
      Gender: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      AdharNo: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(12)]],
      CurrentFlatHouseNo: [''],
      CurrentSocietyApartment: [''],
      CurrentAddress: [''],
      CurrentArea: [''],
      CurrentLandmark: [''],
      CurrentPincode: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(6)]],
      CurrentState: [''],
      CurrentCity: [''],
      CurrentCountry: [''],
      MobileNo: [''],
      // Add more form controls as needed
    });
  }

  initiateForms(res: any) {
    this.profileForm.patchValue({
      FirstName: res.FirstName,
      MiddleName: res.MiddleName,
      LastName: res.LastName,
      Gender: res.Gender,
      DateOfBirth: res.DateOfBirth,
      AdharNo: res.AdharNo,
      CurrentFlatHouseNo: res.CurrentFlatHouseNo,
      CurrentSocietyApartment: res.CurrentSocietyApartment,
      CurrentAddress: res.CurrentAddress,
      CurrentArea: res.CurrentArea,
      CurrentLandmark: res.CurrentLandmark,
      CurrentPincode: res.CurrentPincode,
      CurrentState: res.CurrentState,
      CurrentCity: res.CurrentCity,
      CurrentCountry: res.CurrentCountry,
      MobileNo: res.mobileNo,
      // Add more form controls as needed
    });
   
  }

  calculateCompletionPercentage(res: any) {
    let filledFields = 0;
    const totalFields = 15; // Assuming you have 15 fields in total, adjust as needed
  
    // Check each field and increment filledFields if it has a value
    const fieldsToCheck = [
      'FirstName',
      'MiddleName',
      'LastName',
      'Gender',
      'DateOfBirth',
      'CurrentFlatHouseNo',
      'AdharNo',
      'CurrentSocietyApartment',
      'CurrentAddress',
      'CurrentArea',
      'CurrentLandmark',
      'CurrentPincode',
      'CurrentState',
      'CurrentCity',
      'CurrentCountry',
      // Add other fields as needed
    ];
  
    for (const field of fieldsToCheck) {
      if (res[field] !== null && res[field] !== undefined && String(res[field]).trim() !== '') {
        filledFields++;
      }
    }
  
    // Calculate the completion percentage, ensuring it doesn't exceed 100%
    this.completionPercentage = Math.min((filledFields / totalFields) * 100, 100);
  
    // Update the completion bar and label
    this.updateCompletionBar();
  }
  
  
  updateCompletionBar() {
    const completionBar = document.querySelector('.completed') as HTMLElement;
    const lblPercentage = document.getElementById('lblpercentage');

    if (completionBar && lblPercentage) {
      completionBar.style.width = `${this.completionPercentage}%`;
      lblPercentage.innerText = `${this.completionPercentage.toFixed(0)}%`;
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.apiService.SubmitPersonalDetail(this.profileForm.value).subscribe(
        (res) => {
          if (res.StatusCode == 201) {
            Swal.fire({
              title: 'Updated Successfully!',
              html: `<b>Profile Updated</b>`,
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.editProfile = false;
            this.loading = false;
            this.getProfilestatus(this.MobileNo);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed To Update',
            });
            this.loading = false;
          }
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.loading = false;
        }
      );
    }
  }

  fillPermanantAddress() {
    // Implement the function as needed
  }
}
