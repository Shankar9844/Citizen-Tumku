import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal.service';
import { FloorService } from '../add-floor/floor.service';

@Component({
  selector: 'app-sasdeclaration',
  templateUrl: './sasdeclaration.component.html',
  styleUrls: ['./sasdeclaration.component.scss']
})
export class SASDeclarationComponent implements OnInit {
  AssessmentYearlst: any;
  Propertyclasslst: any;
  wardlst:any;
  sasdeclaration!: FormGroup;
  propertysearch!: FormGroup;
  sasForm: boolean = false;
  floorDetails: any[] = [];
  floorDetailsget: any[] = [];
  PropertyUsageList:any;
  LandAuthorizationlst: any;
Ward_Name: any;
  constructor(
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    @Inject(FloorService) private floorService: FloorService
  ) {
    this.getassessmentyearlist();
    this.pidsearch();
    this.getwardlist();
    this.getClass();
    this.getauthorisation();
    this.getPropertyUsage();
    // Fetch floor details when the component initializes
    this.fetchFloorDetails();
  }

  ngOnInit() {
    this.formInitiate();
  }

  formInitiate() {
    this.sasdeclaration = this.formBuilder.group({
      ward: [''],
      ownername: [''],
      MiddleName: [''],
      LastName:[''],
      Assyear: [''],
      oldassessmentno: [''],
      newassessmentno: [''],
      coraddress: [''],
      City: [''],
      Propertyaddrress: [''],
      Property_Number:[''],
      Property_Class:[''],
      Land_Authorization:[''],
      PropertyUsage:[''],
      PropertyStatus:[''],
      PropertyType:[''],
      cornersite: [''],
      builtupfloorarea:[''],
      noofFloors:[''],
      Noofowners:[''],
      OpenLand:[''],
      Easth: [''],
      Eastw: [''],
      Westh: [''],
      Westw: [''],
      Northh: [''],
      Northw: [''],
      southh: [''],
      southw: [''],
      TotalArea: [''],
      AreaOccupiedbyBuilding: [''],
      StreetId: [''],
      StreetName: ['']
      // Add other form controls here
    });
  }
  onAssyearSelect (event: any) {
    const selectedLevelId = event.target.value;
   sessionStorage.setItem('year',selectedLevelId)
  }
  getassessmentyearlist() {
    this.apiService.GetTaxYearlistprop().subscribe((res: any[]) => {
      this.AssessmentYearlst = res.map(item => item.Year).reverse();
    });
  }
  getwardlist() {
    this.apiService.Getwardlist().subscribe((res: any[]) => {
        this.wardlst = res.reverse();
    });
}
getClass() {
  this.apiService.GetClasslist().subscribe((res: any[]) => {
      this.Propertyclasslst = res.reverse();
  });
}
getPropertyUsage() {
  this.apiService.GetAllUsages().subscribe((res: any[]) => {
      this.PropertyUsageList = res;
  });
}
getauthorisation() {
  this.apiService.getauthorisation().subscribe((res: any[]) => {
      this.LandAuthorizationlst = res.reverse();
  });
}
  pidsearch() {
    this.propertysearch = this.formBuilder.group({
      PID: ['', [Validators.required]],
      Assyear:  ['', [Validators.required]],
    });
  }

  searchPid() {
    this.apiService.SearchSASPropertydetails(this.propertysearch.value).subscribe(res => {
      console.log(res);
      if (res.ResponceStatusCode == 200) {
        this.formInitiate();
        this.attachRes(res);
sessionStorage.setItem('PID',this.propertysearch.value.PID)
        this.getFloorDetails(res.Auto_ID,res.AssessmentYear)
        this.sasForm = true;
      } else {
        this.sasForm = false;
        Swal.fire({
          icon: 'error',
          title: 'No Results Found',
          text: 'Please enter a valid PID',
        });
      }
    });
  }
  getFloorDetails(Auto_ID: any, AssessmentYear: any) {
    this.apiService.SearchSASFloorDetails(Auto_ID,AssessmentYear).subscribe(res => {
      console.log(res);
      if (res!= '') {
        this.floorDetailsget=res
      } else {
       
        Swal.fire({
          icon: 'info',
          title: 'No Floors Found',
          
        });
      }
    });
  }
  onPropertyTypeChange(event: any) {
    const selectedValue = event.target.value;
    const control = this.sasdeclaration.get('southw');
    if (control) {
      if (selectedValue !== 'PID' && selectedValue !== 'Others') {
        control.disable();
      } else {
        control.enable();
      }
    }
  }

  isControlReadOnly(controlName: string): boolean {
    const propertyType = this.sasdeclaration.get(controlName)?.value; // Use optional chaining operator
    return propertyType !== 'PID' && propertyType !== 'Others';
  }


  attachRes(res: any) {
    this.sasdeclaration.patchValue({
     
      ward: res.Ward_Name,
      ownername: res.Owner_Name_kan,
      MiddleName: res.Owner_HusFather_kan,
      LastName: res.Owner_HusFather_kan, 
      Assyear: res.AssessmentYear,
      oldassessmentno: res.Old_AssessmentNo,
      newassessmentno: res.New_AssessmentNo,
      coraddress: res.AddressLine1,
      City: [''], 
      Propertyaddrress: [''], 
      Property_Number: res.PID,
      Property_Class: [res.Class_Name],
      Land_Authorization: res.AuthId, 
      PropertyUsage:[res.Usage_Name], 
      PropertyStatus: res.PhysicalProperty, 
      PropertyType: res.PropertyType,
      
      builtupfloorarea: [''], 
      noofFloors:res.No_of_Floors,
      Noofowners:res.NofOwners,
      OpenLand: [res.OpenLand],
      Easth: [''], 
      Eastw: [''], 
      Westh: [''], 
      Westw: [''], 
      Northh: [''], 
      Northw: [''], 
      southh: [''], 
      southw: [''], 
      TotalArea: [res.TotalPlotArea],
      AreaOccupiedbyBuilding: [res.AreaOccupiedByBuilding],
      StreetId: [res.Street_Id],
      StreetName: [res.Street_Name]
      
    });
  }

  fetchFloorDetails() {
    // Subscribe to the floorDetails$ observable
    this.floorService.floorDetails$.subscribe((details: any[]) => {
      this.floorDetails = details;
    });
  }

  onSubmit() {
    // Implement your form submission logic here
    console.log(this.sasdeclaration.value);
  }

  openModal() {
    
    const value ='SASadd'
    this.modalService.openModal(value);
  
  }
}
