import { Component, NgZone, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloorService } from './floor.service';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default // Ensure this line is present
})
export class AddFloorComponent implements OnInit {
  formData = {
    name: '',
    email: ''
  };
  floorForm!: FormGroup;
  Propertyfloor!: FormGroup;
  Propertyusage:any;
  PropertyClasses:any;
  AssessmentYearlst: any;
  type: any;
  newPropertyaddfloor: boolean = false;
  sasadd: boolean = false;
  slabtype:any;
  addedFloors: any[] = [];
  FloorLevelList: any[] = [];
  SlabtypeList: any[] = [];
  PropertyUsageList: any[] = [];
  assyear:any;
  PID:any
  private modalSubscription!: Subscription;
  constructor(public modalService: ModalService,public apiService: ApiService ,private fb: FormBuilder, private floorService: FloorService,private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.showModal$.subscribe(state => {
      console.log('Modal state:', state);

      if (!state.isOpen) {
        // Close modal logic or any cleanup
        this.newPropertyaddfloor = false;
        this.sasadd = false;
      } else if (state.type === 'newProperty') {
        console.log(state.type);
        this.newPropertyaddfloor = true;
        this.getfloorUsage()
        this.getpropertyclasses()
        this.addfloorProperty();
       
      } else if (state.type === 'SASadd') {
        this.sasadd = true;
        this.assyear=  sessionStorage.getItem('year')
        this.PID=sessionStorage.getItem('PID')
        console.log(this.assyear)
        this.buildForm();
        this.getassessmentyearlist();
        this.getFloorLevel();
        this.getPropertyUsages();
        this.getpropertyclasses();
        this.getOpenland(this.assyear)
      }
    });
  }

  getOpenland(assyear: any) {
    this.apiService.getOpenlandtax(assyear).subscribe((res: any[]) => {
      this.SlabtypeList = res;
    });
  }

  getFloorLevel() {
    this.apiService.getFloorLevels().subscribe((res: any[]) => {
        this.FloorLevelList = res;
    });
}
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.modalSubscription.unsubscribe();
  }
  getassessmentyearlist() {
    this.apiService.GetTaxYearlistprop().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map(item => {
        const yearParts = item.Year.split('-');
        if (yearParts.length === 1) {
          return yearParts[0] + '-' + (parseInt(yearParts[0], 10) + 1).toString().slice(-2);
        } else {
          return item.Year;
        }
      }).reverse();
    });
  }
  
  getfloorUsage() {
    this.apiService.floorUsage().subscribe((res: any[]) => {
      this.Propertyusage = res.map((item) => item.usagename).reverse();
    });
  }

  getpropertyclasses() {
    this.apiService.getpropertyclasses().subscribe((res: any[]) => {
      console.log("Response from API:", res); // Check the structure of the response
      this.PropertyClasses = res.map((item) => item.classname).reverse();
      console.log("PropertyClasses after mapping:", this.PropertyClasses); // Check the structure of PropertyClasses
    });
  }
  
  onFloorLevelChange(event: any) {
    const selectedValue = event?.target?.value;
    console.log(selectedValue)
    this.apiService.GetSlabTypeByFloorLevel(selectedValue).subscribe((res: any[]) => {
      this.SlabtypeList = res;
    });
  }

  addfloorProperty(){
    this.Propertyfloor = this.fb.group({
      Register_Id: [],
      FloorType_Id: ['', Validators.required],
      FloorUsage_Id: ['', Validators.required],
      FloorLevel_Id: ['', Validators.required],
      FloorClass_Id: ['', Validators.required],
      SlabType_Id: ['', Validators.required],
      PlinthArea_Assessed: ['', Validators.required],
      PlinthArea_UnAssessed: ['', Validators.required],
      BuildingAge: ['', Validators.required],
      Tax_Rebate: ['', Validators.required]
    });

  }

  onFloorLevelSelect(event: any) {
    const selectedLevelId = event.target.value;
    console.log( event.target)
    if (selectedLevelId) {
        console.log('Selected floor level ID:', selectedLevelId);
        this.apiService.getslabtype(selectedLevelId).subscribe((res: any[]) => {
          this.SlabtypeList = res; // Assign the received data to SlabtypeList
        });
    }
}
SlabRateWithoutDiscount:any
SlabRateWithDiscount:any
onSlabSelect(event: any) {
  const selectedLevelId = event.target.value;
  if (selectedLevelId) {
    
      this.apiService.getslabrates(selectedLevelId,this.assyear).subscribe((res: any) => {
        this.SlabRateWithoutDiscount=res.SlabRate_Without_Discount
        this.SlabRateWithDiscount=res.SlabRate_with_Discount
      });
  }
}

getPropertyUsages() {
  this.apiService.GetAllUsages().subscribe((res: any[]) => {
      this.PropertyUsageList = res;
  });
}

calculateOpenLand() {
  const totalSiteAreaControl = this.floorForm.get('Actual_PlinthArea');
  const areaOccupiedbyBuildingControl = this.floorForm.get('PlinthArea_Assessed');

  if (totalSiteAreaControl && areaOccupiedbyBuildingControl) {
    const totalSiteArea = totalSiteAreaControl.value;
    const areaOccupiedbyBuilding = areaOccupiedbyBuildingControl.value;

    // Check if values are valid numbers
    if (!isNaN(totalSiteArea) && !isNaN(areaOccupiedbyBuilding)) {
      // Calculate the open land area
      const openLandArea = totalSiteArea - areaOccupiedbyBuilding;

      // Update the value of the Open Land input field
      this.floorForm.patchValue({
        PlinthArea_UnAssessed: openLandArea
      });
    }
  }
}

  buildForm() {
    this.floorForm = this.fb.group({
      Property_Type: ['', Validators.required],
      PID: [this.PID],
      InwardRefNum: [''],
      FloorUsage_Name: ['', Validators.required],
      FloorLevel_Name: ['', Validators.required],
      SlabType_Name: ['', Validators.required],
      FloorClass_Name: ['', Validators.required],
      FloorUsage_Id: ['', Validators.required],
      FloorLevel_Id: ['', Validators.required],
      SlabType_Id: ['', Validators.required],
      Slab_Rate_Without_Discount:  ['', Validators.required],
      Slab_Rate_With_Discount:  ['', Validators.required],
      Slab_Remarks:  [''],
      Actual_PlinthArea:  ['', Validators.required],
      PlinthArea_Assessed:  ['', Validators.required],
      PlinthArea_UnAssessed:  ['', Validators.required],
      CapitalValue_Assessed:  ['', Validators.required],
      CapitalValue_UnAssessed:  ['', Validators.required],
      Depreciation_Assessed:  ['', Validators.required],
      Depreciation_UnAssessed:  ['', Validators.required],
      Floor_CapitalValue_Assessed: ['', Validators.required],
      Floor_CapitalValue_UnAssessed:  ['', Validators.required],
      Total_CapitalValue_Assessed:  ['', Validators.required],
      Total_CapitalValue_UnAssessed:  ['', Validators.required],
      TaxationName:  ['', Validators.required],
      Rate_OF_Tax:  ['', Validators.required],
      PropertyTax_Assessed:  ['', Validators.required],
      PropertyTax_UnAssessed:  ['', Validators.required],
      Tax_Rebate:  ['', Validators.required],
      Rebate_Rate:  ['', Validators.required],
      Rebate_Assessed:  ['', Validators.required],
      Rebate_UnAssessed: ['', Validators.required],
      FloorTax_Assessed:  ['', Validators.required],
      FloorTax_UnAssessed:  ['', Validators.required],
      Total_FloorTax: ['', Validators.required],
      FloorClass_Id:  ['', Validators.required],
      Floor_Additional_Rebate:  ['', Validators.required],
      Final_FloorTax:  ['', Validators.required],
      Building_Const_Year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      BuildingAge:  ['', Validators.required],
      SWMCess:  ['', Validators.required],
      Assyear:['']
    });

    this.subscribeToBuildingConsYearChanges();
  }

  subscribeToBuildingConsYearChanges() {
    const buildingConsYearControl = this.floorForm.get('Building_Const_Year');
    const buildingAgeControl = this.floorForm.get('BuildingAge');

    if (buildingConsYearControl && buildingAgeControl) {
      buildingConsYearControl.valueChanges.subscribe((newValue: number | null) => {
        const currentYear = new Date().getFullYear();
        const buildingAge = newValue !== null && newValue !== undefined
          ? currentYear - newValue
          : null;

        buildingAgeControl.setValue(buildingAge);
      });
    }
  }

  onBuildingConsYearChange() {
    const buildingConsYearControl = this.floorForm.value.Building_Const_Year;
    const buildingAgeControl = this.floorForm.get('BuildingAge');
    this.getTaxyear(buildingConsYearControl)
    if (buildingConsYearControl && buildingAgeControl) {
      buildingConsYearControl.valueChanges.subscribe((newValue: number | null) => {
        const currentYear = new Date().getFullYear();

        const buildingAge = newValue !== null && newValue !== undefined
          ? currentYear - newValue
          : ''; // Use '' as a default value if newValue is null or undefined

        buildingAgeControl.setValue(buildingAge);
      });
    }
  }
  getTaxyear(constructionYear:any) {
    if (constructionYear !== null && constructionYear !== undefined) {
      const taxYear = this.findTaxYear(constructionYear);
      if (taxYear) {
          this.floorForm.get('Assyear')?.setValue(taxYear);
      }
  }
  }
  findTaxYear(constructionYear: number): string | null {
    // Iterate through the loaded tax years and find the corresponding tax year based on the construction year
    for (const year of this.AssessmentYearlst) {
        const yearParts = year.split('-');
        if (yearParts.length === 2) {
            const startYear = parseInt(yearParts[0], 10);
            const endYear = startYear + 1;
            if (constructionYear >= startYear && constructionYear <= endYear) {
                return year;
            }
        }
    }
    return null; // Return null if no corresponding tax year is found
}
  


  onSubmit() {
    console.log(this.floorForm.value)
    if (this.floorForm.valid) {
      const formData = this.floorForm.value;
     
      this.floorService.addFloorDetails(formData); // Add floor details to the service
      console.log('Form submitted:', formData);
      this.closeModal();
      this.floorForm.reset();
    }
  }

  onSubmitproeprty() {
    if (this.Propertyfloor.valid) {
      const formData = this.Propertyfloor.value;  // Corrected to use Propertyfloor
      this.floorService.addFloorDetails(formData);
      console.log('Form submitted:', formData);
      this.Propertyfloor.reset();
      this.closeModal();
     
    }
  }
 
  closeModal() {
    this.modalService.closeModal();
  }

  resetForm() {
    this.modalService.closeModal();
  }
}
