import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';

@Component({
  selector: 'app-demand-details',
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.scss']
})
export class DemandDetailsComponent {
  @ViewChild('content') demanda!: ElementRef; 
  assessmentData: any;
  currentDateTime!: string;
  propertyDemand:boolean =false;
  WaterDemand:boolean=false;
  UGDDemand:boolean=false;
  constructor(private route: ActivatedRoute, public apiService: ApiService,private location: Location) {}

  ngOnInit() {
    // Retrieve parameters from the URL
    this.route.queryParams.subscribe(params => {
      const sasId = params['sasId'];
      const AssYear = params['AssYear'];
      const formname= params['form']
      this.updateDateTime();
      console.log(formname)
      switch(formname){
        case "property":
          this.propertyDemand=true;
          this.getDemandDetails(sasId, AssYear);
          break;
          case "water":
            this.WaterDemand=true;
            this.getWaterDemandDetails(sasId, AssYear);
            break;
            case "UGD":
              this.UGDDemand=true;
              this.getUGDDemandDetails(sasId, AssYear);
              break;
      }
    
    });
  }

  updateDateTime() {
    const currentDate = new Date();
    this.currentDateTime = currentDate.toLocaleString();
  }

  getDemandDetails(sasId: any, AssYear: any) {
    this.apiService.PropertytaxDemand(sasId, AssYear).subscribe(
      (res) => {
        console.log(res);
        this.assessmentData = res;
      }
    );
  }
  Amountintext:any;
  getWaterDemandDetails(seqno:any, period:any){
    this.apiService.waterchargesDemand(seqno, period).subscribe(
      (res:any) => {
        console.log(res);
        this.assessmentData = [res];
        this.Amountintext = this.amountToWordsINR(res.CurrentDemand);
        
      }
    );
  }
  getUGDDemandDetails(seqno:any, period:any){
    this.apiService.UGDchargesDemand(seqno, period).subscribe(
      (res:any) => {
        console.log(res);
        this.assessmentData = [res];
        this.Amountintext = this.amountToWordsINR(res.CurrentDemand);
        
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
  amountToWordsINR(amount: number): string {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertLessThanOneThousand(num: number): string {
        let words = '';

        if (num >= 100) {
            words += ones[Math.floor(num / 100)] + ' Hundred ';
            num %= 100;
        }

        if (num >= 20) {
            words += tens[Math.floor(num / 10)] + ' ';
            num %= 10;
        }

        if (num > 0) {
            if (num < 10) {
                words += ones[num];
            } else {
                words += teens[num - 10];
            }
        }

        return words;
    }

    if (amount === 0) {
        return 'Zero Rupees Only';
    }

    let words = '';

    if (amount >= 1000) {
        words += convertLessThanOneThousand(Math.floor(amount / 1000)) + ' Thousand ';
        amount %= 1000;
    }

    words += convertLessThanOneThousand(amount);

    return words.trim() + ' Rupees Only';
}
  downloaddemand() {
    const demanda = this.demanda.nativeElement;
    const doc: jsPDF = new jsPDF('p', 'pt', 'a2');
  
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
  
    // Use html2canvas to capture HTML content as an image
    html2canvas(demanda).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      // Add the image to the PDF
      doc.addImage(imgData, 'PNG', 0, 0, width, height);
  
      // Save the PDF
      doc.save('demand.pdf');
    });
  }
  
}
