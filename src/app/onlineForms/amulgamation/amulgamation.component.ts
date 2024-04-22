import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-amulgamation',
  templateUrl: './amulgamation.component.html',
  styleUrls: ['./amulgamation.component.scss']
})
export class AmulgamationComponent implements OnInit {

  AmulgamationForm: any;
  totalArea1:any;
  totalArea2:any;
  totalArea3:any;
  totalArea4:any;
  AssessmentYearlst: any;
  propertysearch: any;
  attachdata:boolean=false;

  
  constructor(private formBuilder: FormBuilder,private podiservice:ApiService) { }

  getassessmentyearlist() {
    this.podiservice.GetTaxYearlist().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map((item) => item.year).reverse();
    });
  }
  pidsearch() {
    this.propertysearch = this.formBuilder.group({
      PID: ['', [Validators.required]],
      Assyear: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getassessmentyearlist();
     this.pidsearch();
     this.GetPropertyUsage();
     this.GetClassDetails();
   }

   searchPid() {
    this.podiservice.SearchPropertydetails(this.propertysearch.value).subscribe(res => {
      console.log(res);
      if (res[0].ResponceStatusCode == 200) {
        this.attachdata=true;
        this.initForm(res[0]);
        this.loadattachment();

      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'No Results Found',
          text: 'Please enter a valid PID',
        });
      }
    });
  }
  optionalAttachments:any;
  mandatoryAttachments:any;
  loadattachment() {
    this.podiservice.loadMandatoryDoc("amulgamation").subscribe((res: any) => {
      console.log(res);
     
        this.mandatoryAttachments = res;
    
    });
    this.podiservice.LoadNonMand("amulgamation").subscribe(res => {
      console.log(res);
     
      this.optionalAttachments = res;
    
    });
  }
  
  onFileSelected(event: any, attachment: any) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      attachment.selectedFile = files[0];
    }
  }

  initForm(res:any): void {
    this.AmulgamationForm = this.formBuilder.group({
      // GovtDevelopmentAuthID1:['', Validators.required],
      PID:['', Validators.required],
      
      Owner_Name_kan: res.Owner_Name_kan,
      Owner_HusFather_kan: res.Owner_HusFather_kan,
      Owner_Name_Eng:res.Owner_Name_Eng,
      Owner_HusFather_Eng:res.Owner_HusFather_Eng,

      Contact_Name:res.Contact_Name,
      Contact_Addr:res.Contact_Addr,
      Owner_MobileNo:['', Validators.required],
      Applicant_Photo:['', Validators.required],
      Owner_Photo:['', Validators.required],
      HouseNo:['', Validators.required],
      SerialNo:['', Validators.required],
      MutationType_Id:['', Validators.required],
      City:['', Validators.required],

      
      GovtDevelopmentAuthID:['', Validators.required],
      PhysicalProperty:['', Validators.required],
      UnitType:['', Validators.required],
      Construction_Date:['', Validators.required],
      
      Assessment_Year:['', Validators.required],
      RR_No:['', Validators.required],
      New_RR_No:['', Validators.required],
      Page_No:['', Validators.required],
      Property_Class_Id:['', Validators.required],
      Old_AssessmentNo:['', Validators.required],
      New_AssessmentNo:['', Validators.required],
      New_Page_No:['', Validators.required],
      Property_Usage_Id:['', Validators.required],
      PlotArea_Length:['', Validators.required],
      PlotArea_Breadth:['', Validators.required],
      TotalPlotArea: [{ value: '', disabled: true }],
      BuildUp_Length:['', Validators.required],
      BuildUp_Breadth:['', Validators.required],
      TotalBuildUpArea: [{ value: '', disabled: true }],
      New_PlotArea_Length:['', Validators.required],
      New_PlotArea_Breadth:['', Validators.required],
      New_TotalPlotArea:[{ value: '', disabled: true }],
      New_BuildUp_Length:['', Validators.required],
      New_BuildUp_Breadth:['', Validators.required],
      New_TotalBuildUpArea:[{ value: '', disabled: true }]
     
     
      // test5:['', Validators.required],
    });
  }

  onSubmit() {
    if (this.checkFormValidity() &&
        this.checkFormValidity1() &&
        this.checkFormValidity2() &&
        this.checkFormValidity3() &&
      
        this.AmulgamationForm.valid) {
        
      this.podiservice.Insert_AmulgamationDetails(this.AmulgamationForm.value).subscribe(res => {
        if (res.StatusCode == 200) {
          Swal.fire({
            title: 'Success!',
            html: `<p>Your form submitted successfully.</p><br>Inward Reference Number: <br><b>${res.InwardRefNum}</b>`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
            this.AmulgamationForm.reset();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed To submit',
          });
        }
      });
    }
  }
  checkFormValidity(){
    const areRequiredFieldsFilled1 =
    // this.AmulgamationForm!.get('GovtDevelopmentAuthID1')!.value &&
    this.AmulgamationForm!.get('PID')!.value
  
    
  

  return areRequiredFieldsFilled1;
  }
  checkFormValidity1()
  {
    const areRequiredFieldsFilled1 =
    this.AmulgamationForm!.get('Owner_Name_kan')!.value &&
    this.AmulgamationForm!.get('Owner_HusFather_kan')!.value&&
    this.AmulgamationForm!.get('Owner_Name_Eng')!.value &&
    this.AmulgamationForm!.get('Owner_HusFather_Eng')!.value
    
  

  return areRequiredFieldsFilled1;
  }
  checkFormValidity2()
  {
    const areRequiredFieldsFilled1 =
    this.AmulgamationForm!.get('Contact_Name')!.value &&
    this.AmulgamationForm!.get('Contact_Addr')!.value&&
    this.AmulgamationForm!.get('City')!.value &&
    this.AmulgamationForm!.get('Owner_MobileNo')!.value &&
    this.AmulgamationForm!.get('Applicant_Photo')!.value&&
    this.AmulgamationForm!.get('Owner_Photo')!.value&&
    this.AmulgamationForm!.get('HouseNo')!.value&&
    this.AmulgamationForm!.get('SerialNo')!.value&&
 
    this.AmulgamationForm!.get('MutationType_Id')!.value

  return areRequiredFieldsFilled1;
  }
  checkFormValidity3()
  {
    const areRequiredFieldsFilled1 =
    this.AmulgamationForm!.get('GovtDevelopmentAuthID')!.value &&
    this.AmulgamationForm!.get('PhysicalProperty')!.value &&
    this.AmulgamationForm!.get('UnitType')!.value &&
    this.AmulgamationForm!.get('Construction_Date')!.value &&
    this.AmulgamationForm!.get('Property_Usage_Id')!.value &&
    this.AmulgamationForm!.get('Assessment_Year')!.value &&
    this.AmulgamationForm!.get('RR_No')!.value &&
    this.AmulgamationForm!.get('New_RR_No')!.value &&
    this.AmulgamationForm!.get('Page_No')!.value &&
    this.AmulgamationForm!.get('Property_Class_Id')!.value &&
    this.AmulgamationForm!.get('Old_AssessmentNo')!.value &&
    this.AmulgamationForm!.get('New_AssessmentNo')!.value &&
    this.AmulgamationForm!.get('New_Page_No')!.value &&
    this.AmulgamationForm!.get('PlotArea_Length')!.value &&
    this.AmulgamationForm!.get('PlotArea_Breadth')!.value &&
    this.AmulgamationForm!.get('TotalPlotArea')!.value &&
    this.AmulgamationForm!.get('BuildUp_Length')!.value &&
    this.AmulgamationForm!.get('BuildUp_Breadth')!.value &&
    this.AmulgamationForm!.get('TotalBuildUpArea')!.value &&
    this.AmulgamationForm!.get('New_PlotArea_Length')!.value &&
    this.AmulgamationForm!.get('New_PlotArea_Breadth')!.value &&
    this.AmulgamationForm!.get('New_TotalPlotArea')!.value &&
    this.AmulgamationForm!.get('New_BuildUp_Length')!.value &&
    this.AmulgamationForm!.get('New_BuildUp_Breadth')!.value &&
    this.AmulgamationForm!.get('New_TotalBuildUpArea')!.value 
   
   
    // this.AmulgamationForm!.get('test5')!.value;
  
return areRequiredFieldsFilled1;

  }

  calculateTotalPlotArea(): void {
    const plotAreaLength = parseFloat(this.AmulgamationForm.get('PlotArea_Length').value);
    const plotAreaBreadth = parseFloat(this.AmulgamationForm.get('PlotArea_Breadth').value);

    const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

    this.AmulgamationForm.patchValue({
      TotalPlotArea: totalPlotArea.toFixed(2)
    });

    // Calculate total area separately for plot area only
    this.totalArea1 = totalPlotArea;
}

calculateTotalBuildingArea(): void {
    const buildUpLength = parseFloat(this.AmulgamationForm.get('BuildUp_Length').value);
    const buildUpBreadth = parseFloat(this.AmulgamationForm.get('BuildUp_Breadth').value);

    const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

    this.AmulgamationForm.patchValue({
      TotalBuildUpArea: totalBuildUpArea.toFixed(2)
    });

    // Calculate total area separately for building area only
    this.totalArea2 = totalBuildUpArea;
}
  
calculateTotalPlotArea1(): void {
  const plotAreaLength = parseFloat(this.AmulgamationForm.get('New_PlotArea_Length').value);
  const plotAreaBreadth = parseFloat(this.AmulgamationForm.get('New_PlotArea_Breadth').value);

  const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

  this.AmulgamationForm.patchValue({
    New_TotalPlotArea: totalPlotArea.toFixed(2)
  });

  // Calculate total area separately for plot area only
  this.totalArea3 = totalPlotArea;
}

calculateTotalBuildingArea1(): void {
  const buildUpLength = parseFloat(this.AmulgamationForm.get('New_BuildUp_Length').value);
  const buildUpBreadth = parseFloat(this.AmulgamationForm.get('New_BuildUp_Breadth').value);

  const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

  this.AmulgamationForm.patchValue({
    New_TotalBuildUpArea: totalBuildUpArea.toFixed(2)
  });

  // Calculate total area separately for building area only
  this.totalArea4 = totalBuildUpArea;
}
 
PropertyUsagelists:any;
PropertyClassList:any;
AssessmentYears:any;
GetPropertyUsage()
{
  this.podiservice.GetAllUsages().subscribe((res:any[])=>{
    this.PropertyUsagelists=res;
    console.log(this.PropertyUsagelists);
  })
}

GetClassDetails()
{
  this.podiservice.GetClasslist().subscribe((res:any[])=>
  {
 
    this.PropertyClassList=res;
    console.log(this.PropertyClassList);
  })
}

GetYearList()
{
  this.podiservice.LoadYears().subscribe((res:any[])=>{
    this.AssessmentYears=res;
    console.log(this.AssessmentYears);
  })
}
  
}
