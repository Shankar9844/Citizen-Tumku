import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-site-area-change',
  templateUrl: './site-area-change.component.html',
  styleUrls: ['./site-area-change.component.scss']
})
export class SiteAreaChangeComponent implements OnInit {
  
  SiteAreaForm:any;
  
  propertysearch:any;
  AssessmentYearlst:any;
  attachdata:boolean=false;
  constructor(private FormBuilder:FormBuilder, private podiservice:ApiService){}
 
  getassessmentyearlist() {
    this.podiservice.GetTaxYearlist().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map((item) => item.year).reverse();
    });
  }
  
  pidsearch() {
    this.propertysearch = this.FormBuilder.group({
      PID: ['', [Validators.required]],
      Assyear: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.getassessmentyearlist();
     this.pidsearch();
     
   }
  
   searchPid() {
    this.podiservice.SearchPropertydetails(this.propertysearch.value).subscribe(res => {
      console.log(res);
      if (res[0].ResponceStatusCode == 200) {
        this.attachdata=true;
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
  optionalAttachments:any;
  mandatoryAttachments:any;
  loadattachment() {
    this.podiservice.loadMandatoryDoc("PropertyMutation").subscribe((res: any) => {
      console.log(res);
     
        this.mandatoryAttachments = res;
    
    });
    this.podiservice.LoadNonMand("PropertyMutation").subscribe(res => {
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
 

  initForm(res:any)
  {
    this.SiteAreaForm=this.FormBuilder.group({
      
      Owner_Name_kan: res.Owner_Name_kan,
      Owner_HusFather_kan:res.Owner_HusFather_kan,
      Owner_Name_Eng: res.Owner_Name_Eng,
      Owner_HusFather_Eng: res.Owner_HusFather_Eng,
      OccupierName_Kan: res.OccupierName_Kan,
      OccupierName_HusFather_Kan: res.OccupierName_HusFather_Kan,
      OccupierName_Eng:res.OccupierName_Eng,
      OccupierName_HusFather_Eng:res.OccupierName_HusFather_Eng,

      Ward_Id: [res.Ward_Id, Validators.required],
      Block_Id: [res.Block_Id, Validators.required],
      Street_Id: [res.Street_Id, Validators.required],
      Address: [res.Address, Validators.required],
      Corner_Plot: [res.Corner_Plot, Validators.required],
      City: [res.City, Validators.required],
      Owner_MobileNo: [res.Owner_MobileNo, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      
      
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
      UnitType:['', Validators.required],
      UnitType1:['',Validators.required],
      UnitType2:['',Validators.required],
      Construction_Date:['', Validators.required],
      
      Assessment_Year:['', Validators.required],
      RR_No:['', Validators.required],
      
     
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
      New_TotalBuildUpArea:[{ value: '', disabled: true }],
      Desc_OldPropertyArea1:['', Validators.required],
      Desc_OldPropertyArea2:['', Validators.required],
      OldPID:['', Validators.required],
      Desc_PropertyArea1:['', Validators.required],
      Desc_PropertyArea2:['', Validators.required],
    })
  }
  submitSiteForm()
  {
   if(this.SiteAreaForm.valid)
    {
      console.log(this.SiteAreaForm.value);
    }
  }

  checkFormValidity1()
  {
    const areRequiredFieldsFilled1 =
    this.SiteAreaForm!.get('Owner_Name_kan')!.value &&
    this.SiteAreaForm!.get('Owner_HusFather_kan')!.value&&
    this.SiteAreaForm!.get('Owner_Name_Eng')!.value &&
    this.SiteAreaForm!.get('Owner_HusFather_Eng')!.value&&
    this.SiteAreaForm!.get('OccupierName_Kan')!.value &&
    this.SiteAreaForm!.get('OccupierName_HusFather_Kan')!.value&&
    this.SiteAreaForm!.get('OccupierName_Eng')!.value &&
    this.SiteAreaForm!.get('OccupierName_HusFather_Eng')!.value
    
  
  
  return areRequiredFieldsFilled1;
  }


  checkFormValidity2()
  {
    const areRequiredFieldsFilled1 =
    this.SiteAreaForm!.get('Ward_Id')!.value &&
    this.SiteAreaForm!.get('Block_Id')!.value&&
    this.SiteAreaForm!.get('Street_Id')!.value &&

    this.SiteAreaForm!.get('Address')!.value&&
    this.SiteAreaForm!.get('Corner_Plot')!.value &&
    this.SiteAreaForm!.get('City')!.value&&
    this.SiteAreaForm!.get('Owner_MobileNo')!.value
  
  return areRequiredFieldsFilled1;
  }

  checkFormValidity3()
  {
    const areRequiredFieldsFilled1 =
    this.SiteAreaForm!.get('Contact_Name')!.value &&
    this.SiteAreaForm!.get('Contact_Addr')!.value &&
    this.SiteAreaForm!.get('Applicant_MobileNo')!.value &&
    this.SiteAreaForm!.get('Applicant_Email')!.value &&
    // this.Unassed!.get('test7')!.value &&
    // this.Unassed!.get('test8')!.value &&
    this.SiteAreaForm!.get('HouseNo')!.value &&
    this.SiteAreaForm!.get('SerialNo')!.value &&
    this.SiteAreaForm!.get('PropertyNo')!.value 
    
    return areRequiredFieldsFilled1;
  }


  checkFormValidity4() {
    const areRequiredFieldsFilled =
    this.SiteAreaForm!.get('GovtDevelopmentAuthID')!.value &&
    this.SiteAreaForm!.get('PhysicalProperty')!.value &&
    this.SiteAreaForm!.get('UnitType')!.value &&
    this.SiteAreaForm!.get('UnitType1')!.value &&
    this.SiteAreaForm!.get('UnitType2')!.value &&
    this.SiteAreaForm!.get('Construction_Date')!.value &&
    this.SiteAreaForm!.get('Property_Usage_Id')!.value &&
    this.SiteAreaForm!.get('Assessment_Year')!.value &&
    this.SiteAreaForm!.get('RR_No')!.value &&
  
  
    this.SiteAreaForm!.get('Property_Class_Id')!.value &&
    this.SiteAreaForm!.get('Old_AssessmentNo')!.value &&
    this.SiteAreaForm!.get('New_AssessmentNo')!.value &&
    this.SiteAreaForm!.get('New_Page_No')!.value &&
    this.SiteAreaForm!.get('PlotArea_Length')!.value &&
    this.SiteAreaForm!.get('PlotArea_Breadth')!.value &&
    this.SiteAreaForm!.get('TotalPlotArea')!.value &&
    this.SiteAreaForm!.get('BuildUp_Length')!.value &&
    this.SiteAreaForm!.get('BuildUp_Breadth')!.value &&
    this.SiteAreaForm!.get('TotalBuildUpArea')!.value &&
    this.SiteAreaForm!.get('New_PlotArea_Length')!.value &&
    this.SiteAreaForm!.get('New_PlotArea_Breadth')!.value &&
    this.SiteAreaForm!.get('New_TotalPlotArea')!.value &&
    this.SiteAreaForm!.get('New_BuildUp_Length')!.value &&
    this.SiteAreaForm!.get('New_BuildUp_Breadth')!.value &&
    this.SiteAreaForm!.get('New_TotalBuildUpArea')!.value&&
    this.SiteAreaForm!.get('Desc_OldPropertyArea1')!.value &&
    this.SiteAreaForm!.get('Desc_OldPropertyArea2')!.value &&
    this.SiteAreaForm!.get('OldPID')!.value &&
    this.SiteAreaForm!.get('Desc_PropertyArea1')!.value &&
    this.SiteAreaForm!.get('Desc_PropertyArea2')!.value

  return areRequiredFieldsFilled;
  }
  
  totalArea2:any;
  totalArea1:any;
  totalArea3:any;
  totalArea4:any;

  calculateTotalPlotArea(): void {
    const plotAreaLength = parseFloat(this.SiteAreaForm.get('PlotArea_Length').value);
    const plotAreaBreadth = parseFloat(this.SiteAreaForm.get('PlotArea_Breadth').value);

    const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

    this.SiteAreaForm.patchValue({
      TotalPlotArea: totalPlotArea.toFixed(2)
    });

    // Calculate total area separately for plot area only
    this.totalArea1 = totalPlotArea;
}

calculateTotalBuildingArea(): void {
    const buildUpLength = parseFloat(this.SiteAreaForm.get('BuildUp_Length').value);
    const buildUpBreadth = parseFloat(this.SiteAreaForm.get('BuildUp_Breadth').value);

    const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

    this.SiteAreaForm.patchValue({
      TotalBuildUpArea: totalBuildUpArea.toFixed(2)
    });

    // Calculate total area separately for building area only
    this.totalArea2 = totalBuildUpArea;
}
  
calculateTotalPlotArea1(): void {
  const plotAreaLength = parseFloat(this.SiteAreaForm.get('New_PlotArea_Length').value);
  const plotAreaBreadth = parseFloat(this.SiteAreaForm.get('New_PlotArea_Breadth').value);

  const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

  this.SiteAreaForm.patchValue({
    New_TotalPlotArea: totalPlotArea.toFixed(2)
  });

  // Calculate total area separately for plot area only
  this.totalArea3 = totalPlotArea;
}

calculateTotalBuildingArea1(): void {
  const buildUpLength = parseFloat(this.SiteAreaForm.get('New_BuildUp_Length').value);
  const buildUpBreadth = parseFloat(this.SiteAreaForm.get('New_BuildUp_Breadth').value);

  const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

  this.SiteAreaForm.patchValue({
    New_TotalBuildUpArea: totalBuildUpArea.toFixed(2)
  });

  // Calculate total area separately for building area only
  this.totalArea4 = totalBuildUpArea;
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
