import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'https://demo.seminalsoftwarepvt.in/TumkuruMiddleware/api/';
  private apiEoffice: string='https://test.seminalsoftwarepvt.in/TumakuruEoffice/api';
  private propertytaxurl = 'https://demo.seminalsoftwarepvt.in/elcitademovs2017';
  private gapiUrl = 'https://demo.seminalsoftwarepvt.in/TumkuruGrievanceWebApi';
  private waterapiUrl='https://demo.seminalsoftwarepvt.in/WTAXTMKAPI/api';
  private LoadStreet='https://demo.seminalsoftwarepvt.in/TumkuruMiddleware/api/SASDeclaration/GetWard';

  
  constructor(private http: HttpClient) {}
  public config = { headers: new HttpHeaders().set('Content-Type', 'application/json'
  ) }
  
  private handleError(error: any): Observable<never> {
    return throwError(() => error);
  }
  SubmitPersonalDetail(form:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}CitizenUserRegistration/InsertCitizenUserCreation`,form).pipe(
     catchError((error: any) => this.handleError(error))
   );
  }
  GetPersonalDetail(MobileNo:any):Observable<any>{
    return this.http.get(`${this.apiUrl}CitizenUserRegistration/CheckMblNum?mobileNo=${MobileNo}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
GetwardDetails():Observable<any>
{
  return this.http.get(`${this.LoadStreet}`).pipe( catchError((error: any) => this.handleError(error)));
}
  
  GetTaxYearlist(): Observable<any> {
    return this.http.get<any>(`${this.propertytaxurl}/api/PTAXPayment/LoadYears`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  LoadYears():Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}/PropertyServices/LoadYears`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  
  Getwardlist(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SASDeclaration/GetWard`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  GetClasslist(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyDetails/GetAllClassDetails`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  GetAllUsages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyDetails/GetAllUsages`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
 
  getFloorLevels(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SASDeclaration/GetFloorLevel`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  getauthorisation(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SASDeclaration/LoadAuthorization`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  GetTaxYearlistprop(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyServices/LoadYears`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  floorUsage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyDetails/GetAllUsages`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  getpropertyclasses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyDetails/GetAllClassDetails`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  GetSlabTypeByFloorLevel(floor:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyDetails/GetSlabTypeByFloorLevel?floorlevel=${floor}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  getslabtype(floor:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyDetails/GetSlabTypeByFloorLevel?floorlevel=${floor}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  getslabrates(id:any,year:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SASDeclaration/GetSlabRate?SlabId=${id}&Year=${year}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  getOpenlandtax(year:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SASDeclaration/GetOpenLandTax?Year=${year}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  SearchPropertydetails(form:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}PropertyDetails/PropertySearch?PID=${form.PID}&Assyear=${form.Assyear}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  SearchSASPropertydetails(form:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}SASDeclaration/GetPropertyDetailsByPID?PID=${form.PID}&Assessment_Year=${form.Assyear}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  SearchSASFloorDetails(id:any,assyr:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}SASDeclaration/GetFloorDetails?ID=${id}&Assessment_Year=${assyr}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  SearchWaterDetails(form:any): Observable<any> {
    return this.http.get<any>(`${this.waterapiUrl}/WTAX/GetCurrentMonthDCBDetailsbySeqNo?SeqNo=${form.SeqNo}&Period=${form.Period}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  SearchUGDDetails(form:any): Observable<any> {
    return this.http.get<any>(`${this.waterapiUrl}/UGD/UGDDCBHistoryDetails?SeqNo=${form.SeqNo}&TaxYear=${form.Period}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  SearchpersonWaterDetails(form:any): Observable<any> {
    return this.http.get<any>(`${this.waterapiUrl}/WTAX/GetwaterBasicDetails?SeqNo=${form.SeqNo}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  SearchpersonUGDDetails(form:any): Observable<any> {
    return this.http.get<any>(`${this.waterapiUrl}/UGD/UGDBasicDetails?SeqNo=${form.SeqNo}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  loadMandatoryDoc(formtype:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}PropertyDetails/GetMandatoryAttachmentsProperty?FormName=${formtype}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  LoadNonMand(formtype:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}PropertyDetails/GetOptionalAttachments_ForProperty?FormName=${formtype}`).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  UploadImage(file:any):Observable<any>{
  
    const formData = new FormData();  
    formData.append("file", file, file.name); 
    return this.http.post<any>(`${this.gapiUrl}/api/Grievance/UploadFile?FilekeyName=add`,formData).pipe(catchError(error => {
      return throwError(error);
  }));
  }
  Insert_PodiDetails(form:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/PropertyServices/Insert_PodiDetails`,form).pipe(
     catchError((error: any) => this.handleError(error))
   );
  }
  Insert_AmulgamationDetails(form:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/PropertyServices/Insert_AmulgamationDetails`,form).pipe(
     catchError((error: any) => this.handleError(error))
   );
  }
    GetComplaint(param: any): Observable<any> {
      return this.http.get(`${this.gapiUrl}/api/Grievance/GetComplaint?Mobilenumber=${param}`).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    GetComplaintDetails(param: any): Observable<any> {
      return this.http.get(`${this.gapiUrl}/api/Grievance/GetComplaintsDetails?ComplaintID=${param}`).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }

  
  
    GetCategory(): Observable<any> {
      return this.http.get(`${this.gapiUrl}/api/Grievance/GetCategory`).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    GetSubCategory(param: any): Observable<any> {
      return this.http.get(`${this.gapiUrl}/api/Grievance/GetSubCategory?CatID=${param}`).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    Onsubmit(form: any): Observable<any> {
      return this.http.post(`${this.gapiUrl}/api/Grievance/InsertGrievance`,form,this.config).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }

    NewPropertyreg(form: any): Observable<any> {
      return this.http.post(`${this.apiUrl}PropertyServices/Insert_PropertyDetails`,form,this.config).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    Insert_MutationDetails(form: any): Observable<any> {
      return this.http.post(`${this.apiUrl}PropertyServices/Insert_MutationDetails`,form,this.config).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    addfloors(floor:any) : Observable<any> {
      console.log(floor)
      return this.http.post(`${this.apiUrl}PropertyDetails/insertFloorDetails`,[floor],this.config).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    PropertytaxDemand(sas:any,assyr:any){
      return this.http.get(`${this.apiUrl}PropertyDetails/GetPropertyTaxDemandBySASID?SASID=${sas}&AssessmentYear=${assyr}`).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    waterchargesDemand(sas:any,assyr:any){
      return this.http.get(`${this.waterapiUrl}/WTAX/GetDemandReceiptBills?SeqNo=${sas}&Period=${assyr}`).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    Insert_UnAssessedDetails(form: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/PropertyServices/Insert_UnAssessedDetails`, form).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
    UGDchargesDemand(sas:any,assyr:any){
      return this.http.get(`${this.waterapiUrl}/UGD/UGDGetDemandReceiptBills?SeqNo=${sas}&Period=${assyr}`).pipe(
        catchError((error: any) => this.handleError(error))
      );
    }
}