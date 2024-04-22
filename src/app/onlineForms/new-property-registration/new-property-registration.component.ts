import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal.service';
import { forkJoin } from 'rxjs';
import { FloorService } from '../add-floor/floor.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Attachment {
  applicationformattachmentName: string;
  selectedFile?: File;
}
@Component({
  selector: 'app-new-property-registration',
  templateUrl: './new-property-registration.component.html',
  styleUrls: ['./new-property-registration.component.scss']
})

export class NewPropertyRegistrationComponent implements OnInit {
  newPropertyreg: any;
  mutation!: FormGroup;
  podiform!: FormGroup;
  selectedOption: string = '';
  i18nConfigService: any;
  floorDetails: any[] = [];
  physicalProperty!: string;
  KhataApplicationForm: boolean = false;
  mutationforms: boolean = false;
  attachdata: boolean = false;
  podiforms: boolean = false;
  module: any;
  AssessmentYearlst: any;
  propertysearch!: FormGroup;
  mandatoryAttachments: Attachment[] = [];
  optionalAttachments: Attachment[] = [];


  constructor(private formBuilder: FormBuilder, public apiService: ApiService, private modalService: ModalService, private route: ActivatedRoute, private http: HttpClient,
    @Inject(FloorService) private floorService: FloorService) {
    this.route.queryParams.subscribe(params => {
      this.module = params['form'];
      this.KhataApplicationForm = false;
      this.mutationforms = false;

      switch (this.module) {
        case "propertyreg":
          this.KhataApplicationForm = true;

          this.initForm(0);
          this.loadAttachments();
          break;
        case "mutation":
          this.mutationforms = true;

          this.pidsearch();
          this.mutationform(this.module);
          break;
        case "podiforms":
          this.podiforms = true;
          this.pidsearch();
          this.podiformss(this.module);
      }
    }

    )
    this.fetchFloorDetails();
    console.log('mynameiskhan')
  }

  loadAttachments() {

    this.apiService.loadMandatoryDoc("Propertyregistration").subscribe(res => {
      console.log(res);

      this.mandatoryAttachments = res;

    });
    this.apiService.LoadNonMand("Propertyregistration").subscribe(res => {
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

  uploadFile(attachment: any) {
    if (!attachment.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', attachment.selectedFile);

    // You need to implement the upload API endpoint
    // For example:
    // this.http.post('uploadUrl', formData).subscribe(response => {
    //   console.log('File uploaded successfully');
    // });
  }
  podiformss(res: any) {
    this.mutation = this.formBuilder.group({
      PID: [res.PID, Validators.required],
      Owner_Name_kan: [res.PID, Validators.required],
      Owner_HusFather_kan: [res.PID, Validators.required],
      Owner_Name_Eng: [res.PID, Validators.required],
      Owner_HusFather_Eng: [res.PID, Validators.required],
      New_Owner_Name_kan: [res.PID, Validators.required],
      New_Owner_HusFather_kan: [res.PID, Validators.required],
      New_Owner_Name_Eng: [res.PID, Validators.required],
      New_Owner_HusFather_Eng: [res.PID, Validators.required],
      Ward_Id: [res.PID, Validators.required],
      Block_Id: [res.PID, Validators.required],
      Street_Id: [res.PID, Validators.required],
      Address: [res.PID, Validators.required],
      Owner_MobileNo: [res.PID, Validators.required],
      City: [res.PID, Validators.required],
      Contact_Name: [res.PID, Validators.required],
      Contact_Addr: [res.PID, Validators.required],
      Applicant_MobileNo: [res.PID, Validators.required],
      Applicant_Email: [res.PID, [Validators.required, Validators.email]],
      HouseNo: [res.PID, Validators.required],
      SerialNo: [res.PID, Validators.required],
      PropertyNo: [null, Validators.required],
      MutationType_Id: [res.PID, Validators.required],
      GovtDevelopmentAuthID: [null, Validators.required],
      PhysicalProperty: [null, Validators.required],
      UnitType: [null, Validators.required],
      PropertyType: [null, Validators.required],
      ConstructionType: [null, Validators.required],
      OldPID: [null, Validators.required],
      Construction_Date: [null, Validators.required],
      Old_AssessmentNo: [null, Validators.required],
      New_AssessmentNo: [null, Validators.required],
      Desc_OldAfterPropertyArea1: [null, Validators.required],
      Desc_OldAfterPropertyArea2: [null, Validators.required],
      Desc_PropertyArea1: [null, Validators.required],
      Desc_PropertyArea2: [null, Validators.required],
      Property_Usage_Id: [null, Validators.required],
      Assessment_Year: [null, Validators.required],
      RR_No: [null, Validators.required],
      Page_No: [null, Validators.required],
      New_RR_No: [null, Validators.required],
      New_Page_No: [null, Validators.required],
      Property_Class_Id: [null, Validators.required],
      PlotArea_Length: [null, Validators.required],
      PlotArea_Breadth: [null, Validators.required],
      TotalPlotArea: [null, Validators.required],
      BuildUp_Length: [null, Validators.required],
      BuildUp_Breadth: [null, Validators.required],
      TotalBuildUpArea: [null, Validators.required],
      New_PlotArea_Length: [null, Validators.required],
      New_PlotArea_Breadth: [null, Validators.required],
      New_TotalPlotArea: [null, Validators.required],
      New_BuildUp_Length: [null, Validators.required],
      New_BuildUp_Breadth: [null, Validators.required],
      New_TotalBuildUpArea: [null, Validators.required]

    })
  }

  mutationform(res: any) {
    this.mutation = this.formBuilder.group({
      PID: [res.PID, [Validators.required]],
      Owner_Name_kan: [res.Owner_Name_kan, [Validators.required]],
      Owner_HusFather_kan: [res.Owner_HusFather_kan, [Validators.required]],
      Owner_Name_Eng: [res.Owner_Name_Eng, [Validators.required]],
      Owner_HusFather_Eng: [res.Owner_HusFather_Eng, [Validators.required]],
      Mut_Owner_Name_kan: [res.Mut_Owner_Name_kan, [Validators.required]],
      Mut_Owner_HusFather_kan: [res.Mut_Owner_HusFather_kan, [Validators.required]],
      Mut_Owner_Name_Eng: [res.Owner_HusFather_Eng, [Validators.required]],
      Mut_Owner_HusFather_Eng: [res.Owner_HusFather_Eng, [Validators.required]],
      Assessment_Year: [res.Owner_HusFather_Eng, [Validators.required]],
      ApproverFileID: [res.Owner_HusFather_Eng, [Validators.required]],
      ApproverName: [res.Owner_HusFather_Eng, [Validators.required]],
      approverDesignation: ['', [Validators.required]],
      ApproverDate: ['', [Validators.required]],
      RR_No: ['', [Validators.required]],
      New_RR_No: ['', [Validators.required]],
      Page_No: ['', [Validators.required]],
      New_Page_No: ['', [Validators.required]],
      MutationType_Id: ['', [Validators.required]],
      Owner_Photo: ['null', [Validators.required]],
      NewOwnerImage: ['null', [Validators.required]],
    })
  }
  checkMutationFormValidity() {

    const areRequiredFieldsFilled1 =
      this.mutation!.get('Owner_Name_kan')!.value &&
      this.mutation!.get('Owner_HusFather_kan')!.value &&
      this.mutation!.get('Owner_Name_Eng')!.value &&
      this.mutation!.get('Owner_HusFather_Eng')!.value;



    return areRequiredFieldsFilled1;
  }
  checkMutationFormValidity1() {

    const areRequiredFieldsFilled1 =
      this.mutation!.get('Mut_Owner_HusFather_Eng')!.value &&
      this.mutation!.get('Mut_Owner_Name_Eng')!.value &&
      this.mutation!.get('Mut_Owner_HusFather_kan')!.value &&
      this.mutation!.get('Mut_Owner_Name_kan')!.value;



    return areRequiredFieldsFilled1;
  }
  ngOnInit(): void {
    this.getassessmentyearlist();
    this.pidsearch();


  }
  getassessmentyearlist() {
    this.apiService.GetTaxYearlist().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map((item) => item.year).reverse();
    });
  }

  pidsearch() {
    this.propertysearch = this.formBuilder.group({
      PID: ['', [Validators.required]],
      Assyear: ['', [Validators.required]]
    });
  }

  fetchFloorDetails() {
    // Subscribe to the floorDetails$ observable
    this.floorService.floorDetails$.subscribe((details: any[]) => {
      this.floorDetails = details;
    });
  }

  initForm(res: any): void {
    this.newPropertyreg = this.formBuilder.group({
      IsLayout: ['', [Validators.required]],
      Owner_Name_kan: res.Owner_Name_kan,
      Owner_HusFather_kan: res.Owner_HusFather_kan,
      Owner_Name_Eng: res.Owner_Name_Eng,
      Owner_HusFather_Eng: res.Owner_HusFather_Eng,
      OccupierName_Kan: ['', [Validators.required]],
      OccupierName_HusFather_Kan: ['', [Validators.required]],
      OccupierName_Eng: ['', [Validators.required]],
      OccupierName_HusFather_Eng: [' ', [Validators.required]],
      Block_Id: ['', [Validators.required]],
      Ward_Id: ['', [Validators.required]],
      Street_Id: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Corner_Plot: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Contact_Name: ['', [Validators.required]],
      Contact_Addr: ['', [Validators.required]],
      Applicant_MobileNo: ['', [Validators.required]],
      Applicant_Email: ['', [Validators.required]],
      HouseNo: ['', [Validators.required]],
      SerialNo: ['', [Validators.required]],
      PropertyNo: ['', [Validators.required]],
      GovtDevelopmentAuthID: ['', [Validators.required]],
      PhysicalProperty: ['', [Validators.required]],
      UnitType: ['', [Validators.required]],
      PropertyType: ['', [Validators.required]],
      ConstructionType: ['', [Validators.required]],
      OldPID: ['', [Validators.required]],
      Construction_Date: ['', [Validators.required]],
      Old_AssessmentNo: ['', [Validators.required]],
      New_AssessmentNo: ['', [Validators.required]],
      Desc_PropertyArea1: ['', [Validators.required]],
      Desc_PropertyArea2: ['', [Validators.required]],
      Property_Usage_Id: ['', [Validators.required]],
      Assessment_Year: ['', [Validators.required]],
      RR_No: ['', [Validators.required]],
      Page_No: ['', [Validators.required]],
      Property_Class_Id: ['', [Validators.required]],
      PlotArea_Length: ['', [Validators.required]],
      PlotArea_Breadth: ['', [Validators.required]],
      TotalPlotArea: [{ value: '', disabled: true }],
      BuildUp_Length: ['', [Validators.required]],
      BuildUp_Breadth: ['', [Validators.required]],
      TotalBuildUpArea: [{ value: '', disabled: true }],

    });
  }
  onPropertyChange(value: string) {
    this.physicalProperty = value;
  }
  onPodisubmit(): void {

  }
  onMutsubmit(): void {
    if (this.mutation.valid) {
      console.log(this.mutation.value)

      this.apiService.Insert_MutationDetails(this.mutation.value).subscribe(res => {
        console.log(res);
        if (res.ResponceStatusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: res.ErrorMessage,
            text: res.Message,
          });
          this.mutation.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: res.Message,
            text: 'Could not save data',
          });
        }
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please fill all required Details',
      });
    }
  }
  searchPid() {
    this.apiService.SearchPropertydetails(this.propertysearch.value).subscribe(res => {
      console.log(res);
      if (res[0].ResponceStatusCode == 200) {
        this.attachdata = true
        this.KhataApplicationForm = true
        this.initForm(res[0]);
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
  onsubmit(): void {
    // Check the validity of different sections
    const isSection1Valid = this.checkFormValidity();
    const isSection2Valid = this.checkFormValidity1();
    const isSection3Valid = this.checkFormValidity2();
    const isSection4Valid = this.checkFormValidity3();
    ;

    // Check if all sections are valid
    if (isSection1Valid && isSection2Valid && isSection3Valid && isSection4Valid) {
      console.log(this.newPropertyreg.value);

      // Your API call here
      this.apiService.NewPropertyreg(this.newPropertyreg.value).subscribe(res => {
        console.log(res);
        if (res.ResponceStatusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: res.ErrorMessage,
            text: res.Message,
          });
          this.addfloors(this.floorDetails, res.Id)
        } else {
          Swal.fire({
            icon: 'error',
            title: res.Message,
            text: 'Could not save data',
          });
        }
      });
    } else {
      // Handle the case when any section is not valid
      console.log('Form is not valid. Please fill in all required fields.');
    }
  }


  addfloors(floorDetails: any[], id: any) {
    const observables = floorDetails.map(floor => {
      floor.Register_Id = id;  // Add id as Register_Id in each floor
      return this.apiService.addfloors(floor);
    });

    forkJoin(observables).subscribe(
      (responses: any[]) => {
        // Handle responses if needed
        console.log('All floors added successfully:', responses);

        // Clear the form and floor details after completing the entire process
        this.newPropertyreg.reset();  // Assuming this is your form
        floorDetails.length = 0;      // Optionally clear the floor details array
      },
      (error: any) => {
        // Handle errors if needed
        console.error('Error adding floors:', error);
      }
    );
  }



  checkFormValidity() {

    const areRequiredFieldsFilled1 =
      this.newPropertyreg!.get('Owner_Name_kan')!.value &&
      this.newPropertyreg!.get('Owner_HusFather_kan')!.value &&
      this.newPropertyreg!.get('Owner_Name_Eng')!.value &&
      this.newPropertyreg!.get('Owner_HusFather_Eng')!.value;



    return areRequiredFieldsFilled1;
  }


  checkFormValidity2() {
    const areRequiredFieldsFilled1 =
      this.newPropertyreg!.get('Block_Id')!.value &&
      this.newPropertyreg!.get('Ward_Id')!.value &&
      this.newPropertyreg!.get('Street_Id')!.value &&
      this.newPropertyreg!.get('Address')!.value;

    return areRequiredFieldsFilled1;
  }


  checkFormValidity1() {
    const areRequiredFieldsFilled1 =
      this.newPropertyreg!.get('OccupierName_Kan')!.value &&
      this.newPropertyreg!.get('OccupierName_HusFather_Kan')!.value &&
      this.newPropertyreg!.get('OccupierName_Eng')!.value &&
      this.newPropertyreg!.get('OccupierName_HusFather_Eng')!.value

    return areRequiredFieldsFilled1;
  }


  checkFormValidity3() {
    const areRequiredFieldsFilled1 =
      this.newPropertyreg!.get('Contact_Name')!.value &&
      this.newPropertyreg!.get('Contact_Addr')!.value &&
      this.newPropertyreg!.get('Applicant_MobileNo')!.value &&
      this.newPropertyreg!.get('Applicant_Email')!.value &&
      this.newPropertyreg!.get('HouseNo')!.value &&
      this.newPropertyreg!.get('SerialNo')!.value &&
      this.newPropertyreg!.get('PropertyNo')!.value

    return areRequiredFieldsFilled1;
  }

  openModal() {
    const value = 'newProperty';

    this.modalService.openModal(value);
  }


  totalArea1: any;
  totalArea2: any;

  calculateTotalPlotArea(): void {
    const plotAreaLength = parseFloat(this.newPropertyreg.get('PlotArea_Length').value);
    const plotAreaBreadth = parseFloat(this.newPropertyreg.get('PlotArea_Breadth').value);

    const totalPlotArea = isNaN(plotAreaLength) || isNaN(plotAreaBreadth) ? 0 : plotAreaLength * plotAreaBreadth;

    this.newPropertyreg.patchValue({
      TotalPlotArea: totalPlotArea.toFixed(2)
    });

    // Calculate total area separately for plot area only
    this.totalArea1 = totalPlotArea;
  }

  calculateTotalBuildingArea(): void {
    const buildUpLength = parseFloat(this.newPropertyreg.get('BuildUp_Length').value);
    const buildUpBreadth = parseFloat(this.newPropertyreg.get('BuildUp_Breadth').value);

    const totalBuildUpArea = isNaN(buildUpLength) || isNaN(buildUpBreadth) ? 0 : buildUpLength * buildUpBreadth;

    this.newPropertyreg.patchValue({
      TotalBuildUpArea: totalBuildUpArea.toFixed(2)
    });

    // Calculate total area separately for building area only
    this.totalArea2 = totalBuildUpArea;
  }

  PropertyUsagelists: any;
  PropertyClassList: any;
  getwardsetails: any;
  GetPropertyUsage() {
    this.apiService.GetAllUsages().subscribe((res: any[]) => {
      this.PropertyUsagelists = res;
      console.log(this.PropertyUsagelists);
    })
  }

  GetClassDetails() {
    this.apiService.GetClasslist().subscribe((res: any[]) => {

      this.PropertyClassList = res;
      console.log(this.PropertyClassList);
    })
  }

  getwarddetail() {
    this.apiService.GetwardDetails().subscribe((res: any[]) => {
      this.getwardsetails = res;
      console.log(this.getwardsetails);
    })
  }

}