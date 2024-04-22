import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-property-mutation',
  templateUrl: './property-mutation.component.html',
  styleUrls: ['./property-mutation.component.scss']
})
export class PropertyMutationComponent implements OnInit{

  PropertyMutation:any;
  propertysearch:any;
  AssessmentYearlst:any;
  attachdata:boolean=false;

 constructor(private FormBuilder: FormBuilder, private podiservice:ApiService)
{

}


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
    this.PropertyMutation=this.FormBuilder.group({
      Owner_Name_kan: res.Owner_Name_kan,
      Owner_HusFather_kan:res.Owner_HusFather_kan,
      Owner_Name_Eng: res.Owner_Name_Eng,
      Owner_HusFather_Eng: res.Owner_HusFather_Eng,
      OccupierName_Kan: res.OccupierName_Kan,
      OccupierName_HusFather_Kan: res.OccupierName_HusFather_Kan,
      OccupierName_Eng:res.OccupierName_Eng,
      OccupierName_HusFather_Eng:res.OccupierName_HusFather_Eng,

      Ward_Id: res.Ward_Id,
      Block_Id: res.Block_Id,
      Street_Id: res.Street_Id,
    
      Address: res.Address,
      Corner_Plot:res.Corner_Plot,
      City:res.City,
      Owner_MobileNo: [res.Owner_MobileNo, [Validators.required, Validators.pattern(/^\d{10}$/)]],

      Contact_Name:res.Contact_Name,
      Contact_Addr: res.Contact_Addr,
      Applicant_MobileNo: res.Applicant_MobileNo,
      Applicant_Email: res.Applicant_Email,
      Applicant_Photo: res.Applicant_Photo,
      Owner_Photo: res.Owner_Photo,
      HouseNo: res.HouseNo,
      SerialNo: res.SerialNo,
      PropertyNo: res.PropertyNo,
      MutationType: res.MutationType,

      
      GovtDevelopmentAuthID: res.GovtDevelopmentAuthID,
      PhysicalProperty: res.PhysicalProperty,
      UnitType: res.UnitType,
      ConstructionType: res.ConstructionType,
      PropertyType: res.PropertyType,
      Construction_Date: res.Construction_Date,
      Assessment_Year: res.Assessment_Year,
      RR_No: res.RR_No,
      Property_Class_Id: res.Property_Class_Id,
      Old_AssessmentNo: res.Old_AssessmentNo,
      New_AssessmentNo: res.New_AssessmentNo,
      New_Page_No: res.New_Page_No,
      Property_Usage_Id: res.Property_Usage_Id,
      PlotArea_Length: res.PlotArea_Length,
      PlotArea_Breadth: res.PlotArea_Breadth,
      TotalPlotArea: res.PlotArea_Length * res.PlotArea_Breadth,
      BuildUp_Length: res.BuildUp_Length,
      BuildUp_Breadth: res.BuildUp_Breadth,
      TotalBuildUpArea:  res.BuildUp_Length * res.BuildUp_Breadth,
      Desc_OldPropertyArea1: res.Desc_OldPropertyArea1,
      Desc_OldPropertyArea2: res.Desc_OldPropertyArea2,
      OldPID: res.OldPID,
      Desc_PropertyArea1: res.Desc_PropertyArea1,
      Desc_PropertyArea2: res.Desc_PropertyArea2

    })
  }

  submitMutationForm(){
    if(this.PropertyMutation.valid)
      {
        console.log(this.PropertyMutation.value);
      }
  }

 

  checkFormValidity1() {
    const areRequiredFieldsFilled1 =
        this.PropertyMutation!.get('Owner_Name_kan')!.value &&
        this.PropertyMutation!.get('Owner_HusFather_kan')!.value &&
        this.PropertyMutation!.get('Owner_Name_Eng')!.value &&
        this.PropertyMutation!.get('Owner_HusFather_Eng')!.value &&
        this.PropertyMutation!.get('OccupierName_Kan')!.value &&
        this.PropertyMutation!.get('OccupierName_HusFather_Kan')!.value &&
        this.PropertyMutation!.get('OccupierName_Eng')!.value &&
        this.PropertyMutation!.get('OccupierName_HusFather_Eng')!.value;

    return areRequiredFieldsFilled1;
}

checkFormValidity2() {
    const areRequiredFieldsFilled2 =
        this.PropertyMutation!.get('Ward_Id')!.value &&
        this.PropertyMutation!.get('Block_Id')!.value &&
        this.PropertyMutation!.get('Street_Id')!.value &&
        this.PropertyMutation!.get('Address')!.value &&
        this.PropertyMutation!.get('Corner_Plot')!.value &&
        this.PropertyMutation!.get('City')!.value &&
        this.PropertyMutation!.get('Owner_MobileNo')!.value;

    return areRequiredFieldsFilled2;
}

checkFormValidity3() {
  const areRequiredFieldsFilled3 =
      this.PropertyMutation!.get('Contact_Name')!.value &&
      this.PropertyMutation!.get('Contact_Addr')!.value &&
      this.PropertyMutation!.get('Applicant_MobileNo')!.value &&
      this.PropertyMutation!.get('Applicant_Email')!.value &&
      this.PropertyMutation!.get('Applicant_Photo')!.value &&
      this.PropertyMutation!.get('Owner_Photo')!.value &&
      this.PropertyMutation!.get('HouseNo')!.value &&
      this.PropertyMutation!.get('SerialNo')!.value &&
      this.PropertyMutation!.get('PropertyNo')!.value;

  return areRequiredFieldsFilled3;
}


checkFormValidity4() {
  const areRequiredFieldsFilled =
      this.PropertyMutation!.get('GovtDevelopmentAuthID')!.value &&
      this.PropertyMutation!.get('PhysicalProperty')!.value &&
      this.PropertyMutation!.get('UnitType')!.value &&
      this.PropertyMutation!.get('ConstructionType')!.value &&
      this.PropertyMutation!.get('PropertyType')!.value &&
      this.PropertyMutation!.get('Construction_Date')!.value &&
      this.PropertyMutation!.get('Property_Usage_Id')!.value &&
      this.PropertyMutation!.get('Assessment_Year')!.value &&
      this.PropertyMutation!.get('RR_No')!.value &&

      this.PropertyMutation!.get('Property_Class_Id')!.value &&
      this.PropertyMutation!.get('Old_AssessmentNo')!.value &&
      this.PropertyMutation!.get('New_AssessmentNo')!.value &&
      this.PropertyMutation!.get('New_Page_No')!.value &&
      this.PropertyMutation!.get('PlotArea_Length')!.value &&
      this.PropertyMutation!.get('PlotArea_Breadth')!.value &&
      this.PropertyMutation!.get('TotalPlotArea')!.value &&
      this.PropertyMutation!.get('BuildUp_Length')!.value &&
      this.PropertyMutation!.get('BuildUp_Breadth')!.value &&
      this.PropertyMutation!.get('TotalBuildUpArea')!.value &&
      
      this.PropertyMutation!.get('Desc_OldPropertyArea1')!.value &&
      this.PropertyMutation!.get('Desc_OldPropertyArea2')!.value &&
      this.PropertyMutation!.get('OldPID')!.value &&
      this.PropertyMutation!.get('Desc_PropertyArea1')!.value &&
      this.PropertyMutation!.get('Desc_PropertyArea2')!.value;

  return areRequiredFieldsFilled;
}

totalArea1:any;
totalArea2:any;

calculateTotalPlotArea(): void {
  const plotAreaLength = parseFloat(this.PropertyMutation.get('PlotArea_Length').value);
  const plotAreaBreadth = parseFloat(this.PropertyMutation.get('PlotArea_Breadth').value);

  const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

  this.PropertyMutation.patchValue({
    TotalPlotArea: totalPlotArea.toFixed(2)
  });

  // Calculate total area separately for plot area only
  this.totalArea1 = totalPlotArea;
}

calculateTotalBuildingArea(): void {
  const buildUpLength = parseFloat(this.PropertyMutation.get('BuildUp_Length').value);
  const buildUpBreadth = parseFloat(this.PropertyMutation.get('BuildUp_Breadth').value);

  const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

  this.PropertyMutation.patchValue({
    TotalBuildUpArea: totalBuildUpArea.toFixed(2)
  });

  // Calculate total area separately for building area only
  this.totalArea2 = totalBuildUpArea;
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
