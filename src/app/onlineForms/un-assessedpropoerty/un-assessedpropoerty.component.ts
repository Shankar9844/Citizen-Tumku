import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-un-assessedpropoerty',
  templateUrl: './un-assessedpropoerty.component.html',
  styleUrls: ['./un-assessedpropoerty.component.scss']
})
export class UnAssessedpropoertyComponent implements OnInit{

  AssessmentYearlst: any;
  // attachdata: boolean;
  ngOnInit(): void {
    this.pidsearch();
    this.getassessmentyearlist();
   
  }


  constructor(private form:FormBuilder, private podiservice:ApiService){}
  Unassed:any;
  totalArea1: number = 0;
  totalArea2: number = 0;
  attachdata:boolean=false;
  propertysearch!: FormGroup;

  pidsearch() {
    this.propertysearch = this.form.group({
      PID: ['', [Validators.required]],
      Assyear: ['', [Validators.required]]
    });
  }

  getassessmentyearlist() {
    this.podiservice.GetTaxYearlist().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map((item) => item.year).reverse();
    });
  }


  onFileSelected(event: any, attachment: any) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      attachment.selectedFile = files[0];
    }
  }

  searchPid() {
    this.podiservice.SearchPropertydetails(this.propertysearch.value).subscribe(res => {
      console.log(res);
      if (res[0].ResponceStatusCode == 200) {
        this.attachdata=true
        this.initForm(res[0]);
        this.loadattachment();
        this.GetClassDetails();
        this.GetPropertyUsage();
        this.getwarddetail();
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'No Results Found',
          text: 'Please enter a valid PID',
        });
      }
    });
  }
  initForm(res: any) {
    this.Unassed=this.form.group({

      UnAssessedpropoerty: ['', Validators.required],
      IsLayout: ['', Validators.required],
      Owner_Name_kan: res.Owner_Name_kan,
      Owner_HusFather_kan: res.Owner_Name_Eng,
      Owner_Name_Eng: res.Owner_Name_Eng,
      Owner_HusFather_Eng: res.Owner_HusFather_Eng,
      OccupierName_Kan: ['', Validators.required],
      OccupierName_HusFather_Kan: ['', Validators.required],
      OccupierName_Eng:['',Validators.required],
      OccupierName_HusFather_Eng:['',Validators.required],

      Ward_Id: ['', Validators.required],
      Block_Id: ['', Validators.required],
      Street_Id: ['', Validators.required],
      Address: ['', Validators.required],
      Corner_Plot:['',Validators.required],
      City:['',Validators.required],

      Contact_Name:['', Validators.required],
      Contact_Addr:['', Validators.required],
      Applicant_MobileNo:['', Validators.required],
      Applicant_Email:['', Validators.required],
      // test7:['', Validators.required],
      // test8:['', Validators.required],
      HouseNo:['', Validators.required],
      SerialNo:['', Validators.required],
      PropertyNo:['', Validators.required],


      GovtDevelopmentAuthID:['', Validators.required],
      PhysicalProperty:['', Validators.required],
      // UnitType:['', Validators.required],
   
      Construction_Date:['', Validators.required],
      Property_Usage_Id:['', Validators.required],
      Assessment_Year:['', Validators.required],
      RR_No:['', Validators.required],
      Page_No:['', Validators.required],
      Property_Class_Id:['', Validators.required],
      Old_AssessmentNo:['', Validators.required],
      New_AssessmentNo:['', Validators.required],
      // PropertyType:['', Validators.required],
      PlotArea_Length:['', Validators.required],
      PlotArea_Breadth:['', Validators.required],
      TotalPlotArea: [{ value: '', disabled: true }],
      BuildUp_Length:['', Validators.required],
      BuildUp_Breadth:['', Validators.required],
      TotalBuildUpArea: [{ value: '', disabled: true }],
      
      Desc_OldPropertyArea1:['', Validators.required],
      Desc_OldPropertyArea2:['', Validators.required],
      OldPID:['', Validators.required],
      Desc_PropertyArea1:['', Validators.required],
      Desc_PropertyArea2:['', Validators.required],
     
      
    })
  }

  optionalAttachments:any;
  mandatoryAttachments:any;
  loadattachment() {
    this.podiservice.loadMandatoryDoc("Unassed").subscribe(res => {
      console.log(res);
     
        this.mandatoryAttachments = res;
    
    });
    this.podiservice.LoadNonMand("Unassed").subscribe(res => {
      console.log(res);
     
      this.optionalAttachments = res;
    
    });
  }
 



  

  calculateTotalPlotArea(): void {
    const plotAreaLength = parseFloat(this.Unassed.get('PlotArea_Length').value);
    const plotAreaBreadth = parseFloat(this.Unassed.get('PlotArea_Breadth').value);

    const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

    this.Unassed.patchValue({
      TotalPlotArea: totalPlotArea.toFixed(2)
    });

    // Calculate total area separately for plot area only
    this.totalArea1 = totalPlotArea;
}

calculateTotalBuildingArea(): void {
    const buildUpLength = parseFloat(this.Unassed.get('BuildUp_Length').value);
    const buildUpBreadth = parseFloat(this.Unassed.get('BuildUp_Breadth').value);

    const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

    this.Unassed.patchValue({
      TotalBuildUpArea: totalBuildUpArea.toFixed(2)
    });

    // Calculate total area separately for building area only
    this.totalArea2 = totalBuildUpArea;
}

SubmitUnAssed():void
{
  if (this.checkFormValidity() &&
        this.checkFormValidity1() &&
        this.checkFormValidity2() &&
        this.checkFormValidity3() &&
        this.checkFormValidity4() &&
        this.Unassed.valid) {
        
      this.podiservice.Insert_UnAssessedDetails(this.Unassed.value).subscribe(res => {
        if (res.StatusCode == 200) {
          Swal.fire({
            title: 'Success!',
            html: `<p>Your form submitted successfully.</p><br>Inward Reference Number: <br><b>${res.InwardRefNum}</b>`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
            this.Unassed.reset();
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


checkFormValidity()
{
  const areRequiredFieldsFilled1 =
    this.Unassed!.get('UnAssessedpropoerty')!.value &&
    this.Unassed!.get('IsLayout')!.value 
    
  return areRequiredFieldsFilled1;
}

checkFormValidity1()
{

  const areRequiredFieldsFilled1 =
  this.Unassed!.get('Owner_Name_kan')!.value &&
  this.Unassed!.get('Owner_HusFather_kan')!.value&&
  this.Unassed!.get('Owner_Name_Eng')!.value &&
  this.Unassed!.get('Owner_HusFather_Eng')!.value&&
  this.Unassed!.get('OccupierName_Kan')!.value &&
  this.Unassed!.get('OccupierName_HusFather_Kan')!.value&&
  this.Unassed!.get('OccupierName_Eng')!.value &&
  this.Unassed!.get('OccupierName_HusFather_Eng')!.value
  


return areRequiredFieldsFilled1;
}

checkFormValidity2()
{

  const areRequiredFieldsFilled1 =
  this.Unassed!.get('Ward_Id')!.value &&
  this.Unassed!.get('Block_Id')!.value&&
  this.Unassed!.get('Street_Id')!.value &&
  this.Unassed!.get('Address')!.value&&
  this.Unassed!.get('Corner_Plot')!.value &&
  this.Unassed!.get('City')!.value

return areRequiredFieldsFilled1;
}

checkFormValidity3()
{
  const areRequiredFieldsFilled1 =
  this.Unassed!.get('Contact_Name')!.value &&
  this.Unassed!.get('Contact_Addr')!.value &&
  this.Unassed!.get('Applicant_MobileNo')!.value &&
  this.Unassed!.get('Applicant_Email')!.value &&
  // this.Unassed!.get('test7')!.value &&
  // this.Unassed!.get('test8')!.value &&
  this.Unassed!.get('HouseNo')!.value &&
  this.Unassed!.get('SerialNo')!.value &&
  this.Unassed!.get('PropertyNo')!.value 
  
  return areRequiredFieldsFilled1;
}

checkFormValidity4()
{
  const areRequiredFieldsFilled1 =
    this.Unassed!.get('GovtDevelopmentAuthID')!.value &&
    this.Unassed!.get('PhysicalProperty')!.value &&
    // this.Unassed!.get('UnitType')!.value &&
  
    this.Unassed!.get('Construction_Date')!.value &&
    this.Unassed!.get('Property_Usage_Id')!.value &&
    this.Unassed!.get('Assessment_Year')!.value &&
    this.Unassed!.get('RR_No')!.value &&
    this.Unassed!.get('Page_No')!.value &&
    this.Unassed!.get('Property_Class_Id')!.value &&
    this.Unassed!.get('Old_AssessmentNo')!.value &&
    this.Unassed!.get('New_AssessmentNo')!.value &&
    // this.Unassed!.get('PropertyType')!.value &&
    this.Unassed!.get('PlotArea_Length')!.value &&
    this.Unassed!.get('PlotArea_Breadth')!.value &&
    this.Unassed!.get('TotalPlotArea')!.value &&
    this.Unassed!.get('BuildUp_Length')!.value &&
    this.Unassed!.get('BuildUp_Breadth')!.value &&
    this.Unassed!.get('TotalBuildUpArea')!.value &&
    
    this.Unassed!.get('Desc_OldPropertyArea1')!.value &&
    this.Unassed!.get('Desc_OldPropertyArea2')!.value &&
    this.Unassed!.get('OldPID')!.value &&
    this.Unassed!.get('Desc_PropertyArea1')!.value &&
    this.Unassed!.get('Desc_PropertyArea2')!.value
    // this.Unassed!.get('test5')!.value;
  return areRequiredFieldsFilled1;

}
checkFormValidity6():void{
  
}

PropertyClassList:any;
PropertyUsagelists:any;
getwardsetails:any;
GetClassDetails()
{
  this.podiservice.GetClasslist().subscribe((res:any[])=>
  {
 
    this.PropertyClassList=res;
    console.log(this.PropertyClassList);
  })
}
GetPropertyUsage()
{
  this.podiservice.GetAllUsages().subscribe((res:any[])=>{
    this.PropertyUsagelists=res;
    console.log(this.PropertyUsagelists);
  })
}

getwarddetail()
{
  this.podiservice.GetwardDetails().subscribe((res:any[])=>{
    this.getwardsetails=res;
    console.log(this.getwardsetails);
  })
}

}
