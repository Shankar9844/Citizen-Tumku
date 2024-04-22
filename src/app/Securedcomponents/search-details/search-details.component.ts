import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss'],
})
export class SearchDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('myDataTable') myDataTable!: ElementRef;
  PropertySearch!: FormGroup;
  AssessmentYearlst: any;
  loading: boolean = false;
  proprtyDetails: boolean = false;
  propertyDetailsResponse: any;
  assessmentData: any;
  selectedProperties: string[] = ['PID', 'Assessment_Year', 'ConstructionType', 'Owner_MobileNo', 'Owner_Name_Eng', 'PhysicalProperty', 'PropertyNo', 'PropertyType', 'TotalPlotArea', 'Address'];

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
    this.initLoginForm();
    this.getassessmentyearlist();
  }

  ngAfterViewInit() {
    if (this.assessmentData) {
      this.initializeDataTable();
    }
  }

  initLoginForm(): void {
    this.PropertySearch = this.formBuilder.group({
      PID: ['', [Validators.required]],
      Assyear: ['', [Validators.required]],
    });
  }

  getassessmentyearlist() {
    this.apiService.GetTaxYearlist().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map((item) => item.year).reverse();
    });
  }

  SearchProperty() {
    this.loading=true
    console.log(this.PropertySearch.value);
    this.apiService.SearchPropertydetails(this.PropertySearch.value).subscribe(
      (res) => {
        console.log(res);
        if (res.length > 0 && res[0].ResponceStatusCode === 200) {
          this.proprtyDetails = true;
  
          // Sorting the data
          res.sort((a: { ass_Year: string; }, b: { ass_Year: string; }) => {
            // Splitting the year values
            const yearA = a.ass_Year.split('-').map(Number);
            const yearB = b.ass_Year.split('-').map(Number);
  
            // If both years are the same, sort based on the second part
            if (yearA[0] === yearB[0]) {
              return yearA[1] - yearB[1];
            }
  
            // If yearA is "2023-24", it should come first
            if (yearA[0] === 2023 && yearA[1] === 24) {
              return -1;
            }
  
            // If yearB is "2023-24", it should come first
            if (yearB[0] === 2023 && yearB[1] === 24) {
              return 1;
            }
  
            // Otherwise, sort in descending order based on the first part of the year
            return yearB[0] - yearA[0];
          });
  
          this.assessmentData = res;
          this.propertyDetailsResponse = res[0];
          this.initializeDataTable();
          const setInnerText = (
            element: HTMLElement | null,
            value: string | undefined
          ) => {
            if (element) {
              element.innerText = value || '-';
            }
          };
  
          setInnerText(
            document.getElementById('length') as HTMLElement,
            this.propertyDetailsResponse.PlotArea_Length?.toString()
          );
          setInnerText(
            document.getElementById('breadth') as HTMLElement,
            this.propertyDetailsResponse.PlotArea_Breadth?.toString()
          );
          setInnerText(
            document.getElementById('totala') as HTMLElement,
            this.propertyDetailsResponse.TotalPlotArea?.toString()
          );
          setInnerText(
            document.getElementById('lengthB') as HTMLElement,
            this.propertyDetailsResponse.BuildUp_Length?.toString()
          );
          setInnerText(
            document.getElementById('breadthB') as HTMLElement,
            this.propertyDetailsResponse.BuildUp_Breadth?.toString()
          );
          setInnerText(
            document.getElementById('totalB') as HTMLElement,
            this.propertyDetailsResponse.TotalBuildUpArea?.toString()
          );
          this.loading=false
        } else {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'No Results Found',
            text: 'Please enter valid PID Or Assessment Year.',
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
    const parameters = {
      sasId: details.PID,
      AssYear: details.ass_Year,
      form:'property'
    };
    this.router.navigate(['/demandDetails'], { queryParams: parameters });
  }

  private initializeDataTable() {
    $(() => {
      const table = $('#example').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true, // Enable searching
        "ordering": true,
        "info": true,
        "autoWidth": true,
      });
  
      // Enable sorting in ascending and descending order for all columns
      $('#example thead th').each(function () {
        const columnIndex = $(this).index();
        table.column(columnIndex).data().sort();
      });
    });
  }
  
}
