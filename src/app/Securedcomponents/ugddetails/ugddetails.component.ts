import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ugddetails',
  templateUrl: './ugddetails.component.html',
  styleUrls: ['./ugddetails.component.scss']
})
export class UgddetailsComponent implements OnInit {
  loading: boolean = false;
  UGDSearchform!: FormGroup;
  AssessmentYearlst: any;
  UGDDetails: any;
  assessmentData: any;
  proprtyDetails: boolean = false;
  UGDDetailsResponse: any;
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
    this.UGDSearch();
    this.getassessmentyearlist();
  }
  UGDSearch(): void {
    this.UGDSearchform = this.formBuilder.group({
      SeqNo: ['', [Validators.required]],
      Period: ['', [Validators.required]],
    });
  }
  getassessmentyearlist() {
    this.apiService.GetTaxYearlist().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map((item) => item.year).reverse();
    });
  }
  SearchUGDDetails() {
    console.log(this.UGDSearchform.value);
    this.apiService.SearchUGDDetails(this.UGDSearchform.value).subscribe(
      (res) => {
        if (res.ResponceStatusCode === 200) {
          this.UGDDetails = true;
          this.assessmentData = res.List; // Corrected assignment
        } else {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'No Results Found',
            text: 'Please enter a valid Seq No. Or Period.',
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
    
    this.apiService.SearchpersonUGDDetails(this.UGDSearchform.value).subscribe(
      (res) => {
        console.log(res);
        if (res.ResponceStatusCode == 200) {
         this.UGDDetailsResponse= res;
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
   console.log(this.UGDSearchform.value.Period)
    const parameters = {
      sasId: details.SequenceNo,
      AssYear: this.UGDSearchform.value.Period,
      form:'UGD'
    };
  
    
    this.router.navigate(['/demandDetails'], { queryParams: parameters });
  }
 

}
