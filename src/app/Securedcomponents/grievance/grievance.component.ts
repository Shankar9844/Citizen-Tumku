import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

import inside from 'point-in-polygon';
declare const google: any;
interface WardInfo {
  WARD_NO: number;
  WARD_NAME: string;
  RESERVATIO: string;
}

interface GeoData {
  type: string;
  crs: {
    type: string;
    properties: { name: string };
  };
  features: {
    type: string;
    properties: {
      WARD_NO: number;
      WARD_NAME: string;
      // ... other properties ...
      RESERVATIO: string;
    };
    geometry: {
      type: string;
      coordinates: number[][][][]; // Correct the nested array structure here
    };
  }[];
}

@Component({
  selector: 'app-grievance',
  templateUrl: './grievance.component.html',
  styleUrls: ['./grievance.component.scss']
})
export class GrievanceComponent {
  @ViewChild('fileInput')  fileInputRef!: ElementRef<HTMLInputElement>;
  
  grievanceForm!: FormGroup;
  department: any;
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  subCategories: string[] = ['Sub Category 1', 'Sub Category 2', 'Sub Category 3'];
  latitude: any;
  longitude: any;
  data!: any[];
  selectedData: any;
  pageload:boolean=true;
  data1!: any[];
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  capturedPhoto: string | null = null;
  address: any;
  mobileno:any;
  fullname:any;
  selectedFile: any;
  showCaptureButton: boolean=false;
  selectedsub_category: any;
  MobileNo:any;
  name:any;
  constructor(private formBuilder: FormBuilder, public apiService: ApiService) {
    
  console.log(this.address)
    this.grievanceForm = this.formBuilder.group({
      ComplainerName: new FormControl( this.name),
      MobileNo: new FormControl(this.MobileNo),
      Address: new FormControl( this.address),
      WardNo: new FormControl(''),
      sub_category: new FormControl('', ),
      ComplaintAddress: new FormControl(this.address),
       Description:new FormControl(''),
       Latitude:new FormControl(''),
       Longitude:new FormControl(''),
       CategoryId: new FormControl(''),
      category_name: new FormControl(''),
      img: new FormControl(''),
      griAudio :new FormControl(null),
       griVideo:new FormControl(null),
       Category_Type:new FormControl(null),

    });

  }
  get fieldNameControl(): FormControl {
    return this.grievanceForm.get('fieldName') as FormControl;
  }
  ngOnInit() {
    this.fetchData();
    this.initMap();
  
    this.MobileNo = localStorage.getItem('MobNo');
    this.getProfilestatus(this.MobileNo)
  }
  getProfilestatus(mobno:any){
    this.apiService.GetPersonalDetail(this.MobileNo).subscribe(
      (res) => {
        if (res.ResponceStatusCode == 200) {
         
          this.name = `${res.FirstName} ${res.MiddleName} ${res.LastName}`;
          this.address = `${res.CurrentSocietyApartment}, ${res.CurrentAddress}, ${res.CurrentArea}, ${res.CurrentLandmark}, ${res.CurrentCity}, ${res.CurrentState} ${res.CurrentPincode}`;
          this.initiateForms();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed To Fetch Details',
          });
          
        }
      },
      (error) => {
        console.error('Error fetching personal details:', error);
        
      }
    );
  }
  initiateForms() {
    this.grievanceForm.patchValue({
      ComplainerName: this.name,
      MobileNo:this.MobileNo,
      Address:  this.address,
    });
   
  }
  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    };
  
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  
    this.marker = new google.maps.Marker({
      position: { lat: 0, lng: 0 },
      map: this.map,
      draggable: true,
    });
  
    this.marker.addListener('dragend', () => {
      this.getMarkerAddress();
    });
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          this.map.setCenter(currentLocation);
          this.marker.setPosition(currentLocation);
          this.getMarkerAddress();
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  }
  
  getMarkerAddress(): void {
    const geocoder = new google.maps.Geocoder();
    const position = this.marker.getPosition();
  
    if (position) {
      const latitude = position.lat();
      const longitude = position.lng();
      this.latitude = latitude;
      this.longitude = longitude;
  
      geocoder.geocode({ location: position }, (results: string | any[], status: string) => {
        if (status === 'OK' && results && results.length > 0) {
          const address = results[0].formatted_address;
          this.address = address;
          // Perform any additional logic or update UI as needed
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Geocoder failed',
          });
        }
      });
    }
  }
  // filterGeojson(latitude: number, longitude: number) {
  //   this.grievanceForm.patchValue({ g_address: '' });
  //   let geoData = data;
  //   let g = geoData.features;

  //   for (let i = 0; i < g.length; i++) {
  //     const e = g[i];
  //     let f = e.geometry.coordinates[0][0];
      
  //     if (inside([longitude, latitude], f)) {
  //       let ward = e.properties;
  //       this.grievanceForm.patchValue({ ward_number: ward.WARD_NO, ward_name: ward.WARD_NAME });
  //     }
  //   }
  // }

  fetchData(): void {
    this.pageload=true;
    this.apiService.GetCategory().subscribe(
      (response) => {
        this.pageload=false;
        this.data = response; // Assuming the API response is an array
      },
      (error) => {
        this.pageload=false;
        //console.error('Error fetching data:', error);
      }
    );
  }
  image:any
  onFileSelected(event: any) {
    this.pageload=true;
    // Get the selected file from the event
    const file = event.target.files[0];
    this.selectedFile = file;
    this.apiService.UploadImage(file).subscribe(
      (response) => {

        if(response.StatusCode==200){
          this.pageload=false;
        //console.log(response) // Assuming the API response is an array
        this.image=response.ImagefilePath
      }else{
        this.pageload=false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please uplad file Below 5 MB',
        });
      }
      },
      (error) => {
        this.pageload=false;
        //console.error('Error fetching data:', error);
      }
    );
  }

  onCapturePhoto() {
    // Check if file input is supported
    if ('capture' in this.fileInputRef.nativeElement) {
      // Trigger the file input to select a photo
      this.fileInputRef.nativeElement.capture = 'environment';
      this.fileInputRef.nativeElement.click();
      this.fileInputRef.nativeElement.capture = '';
    } else {
      // If the 'capture' attribute is not supported, use getUserMedia method as before
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.setAttribute('autoplay', 'true');

            // Show the capture button for images
            this.showCaptureButton = true;

            const canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');

            if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              this.capturedPhoto = canvas.toDataURL('image/png');
            } else {
             
            }

           
            this.showCaptureButton = false;

          
            stream.getTracks().forEach((track) => track.stop());
          })
          .catch((error) => {
           
          });
      } else {
        
      }
    }
  }

 

  
  
  selectedDataName: any;
  selectedDataid:any;
  selectedData1:any
  onSelectionChange(event: any): void {
    const selectedValue = event?.target?.value;
  
    if (selectedValue) {
      const [catId, categoryName] = selectedValue.split(',');
      
      this.selectedData1 = {
        CatId: catId.trim(),
        CategoryName: categoryName.trim()
      };
  
      this.selectedDataName = this.selectedData1.CategoryName;
      this.selectedDataid = this.selectedData1.CatId;
  
      this.apiService.GetSubCategory(this.selectedData1.CatId).subscribe(
        (response) => {
          this.data1 = response;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }
  
  selectedsubData:any;
  onSelectionChange2(event: any): void {
  
    // 'event' parameter contains the selected option value (entire object)
    // You can access the selected data from 'event.value'
    const selectedValue = event?.target?.value;
    if (selectedValue) {
      const [catId, categoryName] = selectedValue.split(',');
      
      this.selectedData = {
        subCatId: catId.trim(),
        subCategoryName: categoryName.trim()
      };
      this.selectedsubData = this.selectedData.subCatId;
      this.selectedsub_category= this.selectedData.subCategoryName;
  }
}
  onSubmit() {
    this.pageload=true;
    if (this.grievanceForm.valid) {
     
        this.grievanceForm.value.Latitude = this.latitude;
        this.grievanceForm.value.Longitude = this.longitude;
        this.grievanceForm.value.ComplaintAddress =  this.address;
        if(this.image===undefined){
          this.grievanceForm.value.img = "-";
        }else{
          this.grievanceForm.value.img =  this.image;
        }
       // this.grievanceForm.value.img =  this.image;
        this.grievanceForm.value.griAudio = "Test";
        this.grievanceForm.value.griVideo = "Test";
    this.grievanceForm.value.Category=this.selectedDataid;
    this.grievanceForm.value.category_name=this.selectedDataName;
    this.grievanceForm.value.Category_Type=this.selectedsubData;
    this.grievanceForm.value.CategoryId=this.selectedsubData;
    this.grievanceForm.value.WardNo= "-";
    this.grievanceForm.value.sub_category= this.selectedsub_category;
   
        ////console.log(this.formfield_demo_form.value);
        this.apiService.Onsubmit(this.grievanceForm.value).subscribe(res =>{
          ////console.log(res);
          if(res.statusCode == 200){
            this.pageload=false;
           
           
            Swal.fire({
              icon: 'success',
              title: res.statusMessage,
              text: `Complaint ID: ${res.ComplaintNumber}`,
            });
            this.resetFormFields();
         
          }else{
            this.pageload=false;
            Swal.fire({
              icon: 'error',
              title: res.statusMessage,
              text: res.ComplaintNumber,
            });
          }
        }
        )
    }
  }
  resetFormFields() {
    if (this.grievanceForm) {
      this.grievanceForm.get('Description')?.reset();
      const fileInput = this.fileInputRef.nativeElement;
      fileInput.value = '';
      this.latitude = '';
      this.longitude = '';
      this.address = '';
      this.grievanceForm.get('category_name')?.reset();
      this.grievanceForm.get('SubCategory')?.reset();
    }
  }
}
