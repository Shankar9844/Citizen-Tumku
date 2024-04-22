import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  complaints$!: Observable<any[]>;
  complaints: any[] = [];
  complaintss:any;
  viewbtn: boolean = false;
  mobileno: any;
  complaintdetails:boolean=false;
  constructor(private http: HttpClient, public apiService: ApiService) {
    this.mobileno = localStorage.getItem('MobNo')
  }

  ngOnInit(): void {
    this.onStatusChange('all');
  }

  fetchDataFromAPI(): void {
    this.apiService.GetComplaint(this.mobileno).subscribe(
      (res: any[]) => {
        if (res != null) {
          this.complaintss = res;
          this.viewbtn = true;
        } else if (res === 401) {
          // Handle 401 error
        } else {
          // Handle other errors
        }
      },
      (error) => {
        // Handle API call errors
      }
    );
  }

  onViewButtonClick(complaint: any): void {
    this.apiService.GetComplaintDetails(complaint.ComplaintId).subscribe(
      (res: any[]) => {
        if (res != null) {
          this.viewbtn = false;
          this.complaintdetails= true;
          this.complaintss = res;
        } else if (res === 401) {
          // Handle 401 error
        } else {
          // Handle other errors
        }
      },
      (error) => {
        // Handle API call errors
      }
    );
  }

  onStatusChange(status: string): void {
    this.complaints$ = this.apiService.GetComplaint(this.mobileno).pipe(
      map((complaints: any[]) => (status === 'all' ? complaints : complaints.filter((complaint: { Status_Name: string; }) => complaint.Status_Name === status)))
    );
    this.viewbtn = true;
  }

  onbackButtonClick(complaint: any): void {
    this.onStatusChange('all');
    this.viewbtn = true;
    this.complaintdetails = false;
}
}