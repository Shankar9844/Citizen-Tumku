import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://demo.seminalsoftwarepvt.in/TumkuruMiddleware/';
  private UserUrl: string = 'https://demo.seminalsoftwarepvt.in/EofficeMUDADemoAPI/api';

  private isAuthenticatedKey = 'isAuthenticated';

  constructor(private http: HttpClient, private router: Router) {
    // Retrieve authentication status from local storage on service instantiation
    this.isAuthenticated = this.getStoredAuthenticationStatus();
  }

  private get isAuthenticated(): boolean {
    return sessionStorage.getItem(this.isAuthenticatedKey) === 'true';
  }

  private set isAuthenticated(status: boolean) {
    sessionStorage.setItem(this.isAuthenticatedKey, status.toString());
  }

  setLoginStatus(status: boolean): void {
    this.isAuthenticated = status;
  }

  getLoginStatus(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    // Clear authentication status and user data
    this.isAuthenticated = false;

    // Redirect to the login page after logout
    this.router.navigate(['/Login']); // Adjust the route accordingly
  }

  authenticate(MobileNo: string): Observable<boolean> {
    // Simulate an asynchronous authentication process
    const isAuthenticated = MobileNo === 'user';
    this.setLoginStatus(isAuthenticated);
    return of(isAuthenticated);
  }

  checkAuthentication(): boolean {
    return this.getLoginStatus();
  }

  getOtp(MobileNo: string): Observable<any> {
    return this.http
      .post(`${this.UserUrl}/CitizenLogin/GeneratetheSMSOTP?Mobile=${MobileNo}&SMSflag=false`, null)
      .pipe(
        catchError((error: any) => this.handleError(error))
      );
  }

  SearchUser(MobileNo: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}api/CitizenUserRegistration/CheckMblNum?mobileNo=${MobileNo}`)
      .pipe(
        catchError((error: any) => this.handleError(error))
      );
  }
  SearchMobileNo(MobileNo: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}api/CitizenUserRegistration/CheckMblNum?mobileNo=${MobileNo}`)
      .pipe(
        catchError((error: any) => this.handleError(error))
      );
  }
  private getStoredAuthenticationStatus(): boolean {
    const storedStatus = sessionStorage.getItem(this.isAuthenticatedKey);
    return storedStatus ? storedStatus === 'true' : false;
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
