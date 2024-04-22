import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-waterdetails',
  templateUrl: './waterdetails.component.html',
  styleUrls: ['./waterdetails.component.scss']
})
export class WaterdetailsComponent implements OnInit {
  loading: boolean = false;
  WaterSearchform!: FormGroup;
  AssessmentYearlst: any;
  WaterDetails: any;
  assessmentData: any;
  proprtyDetails: boolean = false;
  WaterDetailsResponse: any;
  selectedProperties: string[] = ['OwnerNameEnglish', 'OwnerNameKannada', 'tapusage', 'PID', 'TapNo','AddressKannada','AddressEnglish','WardName','ZoneName','TapStatus','PaidStatus','BalanceAmount'];

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}
  get isLoggedIn(): boolean {
  
    return this.authService.getLoginStatus();
    
  }
  ngOnInit() {
    this.WaterSearch();
    this.getassessmentyearlist();
  }
  WaterSearch(): void {
    this.WaterSearchform = this.formBuilder.group({
      SeqNo: ['', [Validators.required]],
      Period: ['', [Validators.required]],
    });
  }
  getassessmentyearlist() {
    this.apiService.GetTaxYearlist().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map((item) => item.year).reverse();
    });
  }
  SearchWaterDetails() {
    console.log(this.WaterSearchform.value);
    this.apiService.SearchpersonWaterDetails(this.WaterSearchform.value).subscribe(
      (res) => {
        if (res.ResponceStatusCode == 200) {
          this.WaterDetails = true;
         
          this.WaterDetailsResponse = res;
        }else {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'No Results Found',
            text: 'Please enter valid Seq No. Or Period.',
          });
        }
      })
    this.apiService.SearchWaterDetails(this.WaterSearchform.value).subscribe(
      (res) => {
        console.log(res);
        if (res.ResponceStatusCode == 200) {
          this.assessmentData = res;
          console.log(this.assessmentData)
        } else {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'No DCB Found',
            text: '',
          });
        }
      },
      (error) => {
        console.error('Error:', error);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching data.',
        });
      }
    );
  }


  getPropertyDetailsArray(response: any): any[] {
    const propertyArray = [];

    for (const key in response) {
      if (response.hasOwnProperty(key) && response[key] !== null) {
        propertyArray.push({ label: key, value: response[key] });
      }
    }

    return propertyArray;
  }
  viewDemand(details: any) {
   console.log(this.WaterSearchform.value.Period)
    const parameters = {
      sasId: details.SequenceNo,
      AssYear: this.WaterSearchform.value.Period,
      form:'water'
    };
  
    
    this.router.navigate(['/demandDetails'], { queryParams: parameters });
  }
 

}
