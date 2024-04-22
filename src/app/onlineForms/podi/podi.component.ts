import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-podi',
  templateUrl: './podi.component.html',
  styleUrls: ['./podi.component.scss']
})

export class PodiComponent implements OnInit {
  verificationForm: any;
  propertysearch!: FormGroup;
  attachdata: boolean = false;
  AssessmentYearlst: any;

  constructor(private formBuilder: FormBuilder, private podiservice: ApiService) { }
  ngOnInit(): void {
    this.getassessmentyearlist();
    this.pidsearch();
  }

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

  searchPid() {
    this.podiservice.SearchPropertydetails(this.propertysearch.value).subscribe(res => {
      console.log(res);
      if (res[0].ResponceStatusCode == 200) {
        this.attachdata = true
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
  optionalAttachments: any;
  mandatoryAttachments: any;
  loadattachment() {
    this.podiservice.loadMandatoryDoc("Podi").subscribe(res => {
      console.log(res);

      this.mandatoryAttachments = res;

    });
    this.podiservice.LoadNonMand("Podi").subscribe(res => {
      console.log(res);

      this.optionalAttachments = res;

    });
  }

  initForm(res: any): void {
    this.verificationForm = this.formBuilder.group({

      Owner_Name_kan: res.Owner_Name_kan,
      Owner_HusFather_kan: res.Owner_HusFather_kan,
      Owner_Name_Eng: res.Owner_Name_Eng,
      Owner_HusFather_Eng: res.Owner_HusFather_Eng,

      New_Owner_Name_kan: ['', Validators.required],
      New_Owner_HusFather_kan: ['', Validators.required],
      New_Owner_Name_Eng: ['', Validators.required],
      New_Owner_HusFather_Eng: ['', Validators.required],

      Ward_Id: ['', Validators.required],
      Block_Id: ['', Validators.required],
      Street_Id: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      Owner_MobileNo: ['', Validators.required],


      Contact_Name: ['', Validators.required],
      Contact_Addr: ['', Validators.required],
      Applicant_MobileNo: ['', Validators.required],
      Applicant_Email: ['', Validators.required],
      test7: ['', Validators.required],
      test8: ['', Validators.required],
      HouseNo: ['', Validators.required],
      SerialNo: ['', Validators.required],
      PropertyNo: ['', Validators.required],
      MutationType_Id: ['', Validators.required],


      GovtDevelopmentAuthID: ['', Validators.required],
      PhysicalProperty: ['', Validators.required],
      UnitType: ['', Validators.required],
      Construction_Date: ['', Validators.required],
      Property_Usage_Id: ['', Validators.required],
      Assessment_Year: ['', Validators.required],
      RR_No: ['', Validators.required],
      Page_No: ['', Validators.required],
      Property_Class_Id: ['', Validators.required],
      Old_AssessmentNo: ['', Validators.required],
      New_AssessmentNo: ['', Validators.required],
      PropertyType: ['', Validators.required],
      PlotArea_Length: ['', Validators.required],
      PlotArea_Breadth: ['', Validators.required],
      TotalPlotArea: [{ value: '', disabled: true }],
      BuildUp_Length: ['', Validators.required],
      BuildUp_Breadth: ['', Validators.required],
      TotalBuildUpArea: [{ value: '', disabled: true }],
      New_PlotArea_Length: ['', Validators.required],
      New_PlotArea_Breadth: ['', Validators.required],
      New_TotalPlotArea: [{ value: '', disabled: true }],
      New_BuildUp_Length: ['', Validators.required],
      New_BuildUp_Breadth: ['', Validators.required],
      New_TotalBuildUpArea: [{ value: '', disabled: true }],
      Desc_OldAfterPropertyArea1: ['', Validators.required],
      Desc_OldAfterPropertyArea2: ['', Validators.required],
      OldPID: ['', Validators.required],
      Desc_PropertyArea1: ['', Validators.required],
      Desc_PropertyArea2: ['', Validators.required],

      test5: ['', Validators.required],
    });
  }

  submitVerificationForm(): void {
    if (this.checkFormValidity() &&
      this.checkFormValidity1() &&
      this.checkFormValidity2() &&
      this.checkFormValidity3() &&
      this.checkFormValidity5() &&
      this.verificationForm.valid) {
      // console.log(this.verificationForm.value);
      this.podiservice.Insert_PodiDetails(this.verificationForm.value).subscribe(res => {
        if (res.StatusCode == 200) {
          Swal.fire({
            title: 'Success!',
            html: `<p>Your form submitted successfully.</p><br>Inward Reference Number: <br><b>${res.InwardRefNum}</b>`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
            this.verificationForm.reset();
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
  onFileSelected(event: any, attachment: any) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      attachment.selectedFile = files[0];
    }
  }
  checkFormValidity() {
    const areRequiredFieldsFilled1 =
      this.verificationForm!.get('Owner_Name_kan')!.value &&
      this.verificationForm!.get('Owner_HusFather_kan')!.value &&
      this.verificationForm!.get('Owner_Name_Eng')!.value &&
      this.verificationForm!.get('Owner_HusFather_Eng')!.value

    return areRequiredFieldsFilled1;
  }

  checkFormValidity1() {
    const areRequiredFieldsFilled1 =
      this.verificationForm!.get('New_Owner_Name_kan')!.value &&
      this.verificationForm!.get('New_Owner_HusFather_kan')!.value &&
      this.verificationForm!.get('New_Owner_Name_Eng')!.value &&
      this.verificationForm!.get('New_Owner_HusFather_Eng')!.value

    return areRequiredFieldsFilled1;
  }
  checkFormValidity2() {
    const areRequiredFieldsFilled1 =
      this.verificationForm!.get('Ward_Id')!.value &&
      this.verificationForm!.get('Block_Id')!.value &&
      this.verificationForm!.get('Street_Id')!.value &&
      this.verificationForm!.get('Address')!.value &&
      this.verificationForm!.get('City')!.value &&
      this.verificationForm!.get('Owner_MobileNo')!.value



    return areRequiredFieldsFilled1;
  }

  checkFormValidity3() {
    const areRequiredFieldsFilled1 =
      this.verificationForm!.get('Contact_Name')!.value &&
      this.verificationForm!.get('Contact_Addr')!.value &&
      this.verificationForm!.get('Applicant_MobileNo')!.value &&
      this.verificationForm!.get('Applicant_Email')!.value &&
      this.verificationForm!.get('test7')!.value &&
      this.verificationForm!.get('test8')!.value &&
      this.verificationForm!.get('HouseNo')!.value &&
      this.verificationForm!.get('SerialNo')!.value &&
      this.verificationForm!.get('PropertyNo')!.value &&
      this.verificationForm!.get('MutationType_Id')!.value

    return areRequiredFieldsFilled1;
  }

  // checkFormValidity4()
  // {
  //   const areRequiredFieldsFilled1 =
  //   this.verificationForm!.get('SecondTPACHomeNo')!.value &&
  //   this.verificationForm!.get('SecondTPAdividese')!.value

  // return areRequiredFieldsFilled1;
  // }

  checkFormValidity5() {
    const areRequiredFieldsFilled1 =
      this.verificationForm!.get('GovtDevelopmentAuthID')!.value &&
      this.verificationForm!.get('PhysicalProperty')!.value &&
      this.verificationForm!.get('UnitType')!.value &&
      this.verificationForm!.get('Construction_Date')!.value &&
      this.verificationForm!.get('Property_Usage_Id')!.value &&
      this.verificationForm!.get('Assessment_Year')!.value &&
      this.verificationForm!.get('RR_No')!.value &&
      this.verificationForm!.get('Page_No')!.value &&
      this.verificationForm!.get('Property_Class_Id')!.value &&
      this.verificationForm!.get('Old_AssessmentNo')!.value &&
      this.verificationForm!.get('New_AssessmentNo')!.value &&
      this.verificationForm!.get('PropertyType')!.value &&
      this.verificationForm!.get('PlotArea_Length')!.value &&
      this.verificationForm!.get('PlotArea_Breadth')!.value &&
      this.verificationForm!.get('TotalPlotArea')!.value &&
      this.verificationForm!.get('BuildUp_Length')!.value &&
      this.verificationForm!.get('BuildUp_Breadth')!.value &&
      this.verificationForm!.get('TotalBuildUpArea')!.value &&
      this.verificationForm!.get('New_PlotArea_Length')!.value &&
      this.verificationForm!.get('New_PlotArea_Breadth')!.value &&
      this.verificationForm!.get('New_TotalPlotArea')!.value &&
      this.verificationForm!.get('New_BuildUp_Length')!.value &&
      this.verificationForm!.get('New_BuildUp_Breadth')!.value &&
      this.verificationForm!.get('New_TotalBuildUpArea')!.value &&
      this.verificationForm!.get('Desc_OldAfterPropertyArea1')!.value &&
      this.verificationForm!.get('Desc_OldAfterPropertyArea2')!.value &&
      this.verificationForm!.get('OldPID')!.value &&
      this.verificationForm!.get('Desc_PropertyArea1')!.value &&
      this.verificationForm!.get('Desc_PropertyArea2')!.value &&

      this.verificationForm!.get('test5')!.value
    return areRequiredFieldsFilled1;
  }


  totalArea1: any;
  totalArea2: any;
  totalArea3: any;
  totalArea4: any;

  calculateTotalPlotArea(): void {
    const plotAreaLength = parseFloat(this.verificationForm.get('PlotArea_Length').value);
    const plotAreaBreadth = parseFloat(this.verificationForm.get('PlotArea_Breadth').value);

    const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

    this.verificationForm.patchValue({
      TotalPlotArea: totalPlotArea.toFixed(2)
    });

    // Calculate total area separately for plot area only
    this.totalArea1 = totalPlotArea;
  }

  calculateTotalBuildingArea(): void {
    const buildUpLength = parseFloat(this.verificationForm.get('BuildUp_Length').value);
    const buildUpBreadth = parseFloat(this.verificationForm.get('BuildUp_Breadth').value);

    const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

    this.verificationForm.patchValue({
      TotalBuildUpArea: totalBuildUpArea.toFixed(2)
    });

    // Calculate total area separately for building area only
    this.totalArea2 = totalBuildUpArea;
  }

  calculateTotalPlotArea1(): void {
    const plotAreaLength = parseFloat(this.verificationForm.get('New_PlotArea_Length').value);
    const plotAreaBreadth = parseFloat(this.verificationForm.get('New_PlotArea_Breadth').value);

    const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

    this.verificationForm.patchValue({
      New_TotalPlotArea: totalPlotArea.toFixed(2)
    });

    // Calculate total area separately for plot area only
    this.totalArea3 = totalPlotArea;
  }

  calculateTotalBuildingArea1(): void {
    const buildUpLength = parseFloat(this.verificationForm.get('New_BuildUp_Length').value);
    const buildUpBreadth = parseFloat(this.verificationForm.get('New_BuildUp_Breadth').value);

    const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

    this.verificationForm.patchValue({
      New_TotalBuildUpArea: totalBuildUpArea.toFixed(2)
    });

    // Calculate total area separately for building area only
    this.totalArea4 = totalBuildUpArea;
  }

  PropertyUsagelists: any;
  PropertyClassList: any;
  getwardsetails: any;
  GetPropertyUsage() {
    this.podiservice.GetAllUsages().subscribe((res: any[]) => {
      this.PropertyUsagelists = res;
      console.log(this.PropertyUsagelists);
    })
  }

  GetClassDetails() {
    this.podiservice.GetClasslist().subscribe((res: any[]) => {

      this.PropertyClassList = res;
      console.log(this.PropertyClassList);
    })
  }

  getwarddetail() {
    this.podiservice.GetwardDetails().subscribe((res: any[]) => {
      this.getwardsetails = res;
      console.log(this.getwardsetails);
    })
  }


}
