import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent {
  complaints : any[] = []; // Array to store the items fetched from the API
  viewbtn:boolean=false;
  private isPageReloaded: boolean = false;
mobileno:any;
  constructor(private http: HttpClient,public apiService: ApiService) { 
    this.mobileno=localStorage.getItem('MobNo')
  }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    ////console.log("pk")
   
  }
  rcomplaints:any;
  Icomplents:any;
  recomplaints:any;
  clcomplents:any;
  fetchDataFromAPI(): void {
    this.recomplaints = 0;
this.Icomplents = 0;
this.clcomplents = 0;

this.apiService.GetComplaint(this.mobileno).subscribe(
  (res: any[]) => {
    if (res != null) {
      this.rcomplaints  = res.length;
      // Iterate over the response array
      res.forEach(complaint => {
        switch (complaint.Status_Name) {
          case 'In Progress':
            this.Icomplents++;
            break;
          case 'Resolved':
            this.recomplaints++;
            break;
          case 'Closed':
            this.clcomplents++;
            break;
          // Add more cases if needed for other status names
        }
      });

      // Now you have counts for each status type
      console.log('InProgress Complaints:', this.Icomplents);
      console.log('Resolved Complaints:', this.recomplaints);
      console.log('Closed Complaints:', this.clcomplents);

      // Additional logic or actions based on counts can be added here

      this.viewbtn = true;
    } else if (res === 401) {
      // Handle 401 Unauthorized response
    } else {
      // Handle other cases
    }
  },
  // Handle error if any
);

  }
  complaintId:any;
  onViewButtonClick(complaint: any): void {
    this.complaintId=complaint.ComplaintId
    this.apiService.GetComplaintDetails(this.complaintId).subscribe(
      (res: any[]) => {
        if (res != null) {
          //let user = res;
          this.viewbtn=false;
          this.complaints  = res;
        } else if (res === 401) {
          this.viewbtn=true;
        } else {
        
        }
      },
      
    );
  }
  onbackButtonClick(complaint: any): void {
    this.complaintId=complaint.MobileNo
    this.apiService.GetComplaint(this.complaintId).subscribe(
      (res: any[]) => {
        if (res != null) {
          //let user = res;
          this.viewbtn=true;
          this.complaints  = res;
        } else if (res === 401) {
          this.viewbtn=false;
        } else {
        
        }
      },
      
    );
  }
}


