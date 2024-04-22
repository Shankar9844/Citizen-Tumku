import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './GlobalComponent/login/login.component';
import { PageloadingComponent } from './pageloading/pageloading.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nConfigService, HttpLoaderFactory } from './i18n-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './GlobalComponent/header/header.component';
import { RegisterpageComponent } from './GlobalComponent/registerpage/registerpage.component';
import { CaptchaComponent } from './GlobalComponent/captcha/captcha.component';
import { DashboardComponent } from './GlobalComponent/dashboard/dashboard.component';
import { ProfileComponent } from './Securedcomponents/profile/profile.component';
import { TaxDetailsComponent } from './Securedcomponents/tax-details/tax-details.component';
import { OnlineapplicationsComponent } from './Securedcomponents/onlineapplications/onlineapplications.component';
import { SearchDetailsComponent } from './Securedcomponents/search-details/search-details.component';
import { DashboardReportComponent } from './Securedcomponents/dashboard-report/dashboard-report.component';
import { GrievanceComponent } from './Securedcomponents/grievance/grievance.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FaqComponent } from './infopages/faq/faq.component';
import { ContactComponent } from './infopages/contact/contact.component';
import { SASDeclarationComponent } from './onlineForms/sasdeclaration/sasdeclaration.component';
import { AddFloorComponent } from './onlineForms/add-floor/add-floor.component';
import { FloorService } from './onlineForms/add-floor/floor.service';
import { HistoryComponent } from './Securedcomponents/Grievance/history/history.component';
import { NewPropertyRegistrationComponent } from './onlineForms/new-property-registration/new-property-registration.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './environment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DemandDetailsComponent } from './infopages/demand-details/demand-details.component';
import { FormsComponent } from './onlineForms/forms/forms.component';
import { WaterdetailsComponent } from './Securedcomponents/waterdetails/waterdetails.component';
import { UgddetailsComponent } from './Securedcomponents/ugddetails/ugddetails.component';
import { PodiComponent } from './onlineForms/podi/podi.component';


import { AmulgamationComponent } from './onlineForms/amulgamation/amulgamation.component';

import { SiteAreaChangeComponent } from './onlineForms/site-area-change/site-area-change.component';
import { PropertyMutationComponent } from './onlineForms/property-mutation/property-mutation.component';
import { UnAssessedpropoertyComponent } from './onlineForms/un-assessedpropoerty/un-assessedpropoerty.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageloadingComponent,
    HeaderComponent,
    RegisterpageComponent,
    CaptchaComponent,
    DashboardComponent,
    ProfileComponent,
    TaxDetailsComponent,
    OnlineapplicationsComponent,
    SearchDetailsComponent,
    DashboardReportComponent,
    GrievanceComponent,
    FaqComponent,
    ContactComponent,
    SASDeclarationComponent,
    AddFloorComponent,
    HistoryComponent,
    NewPropertyRegistrationComponent,
    DemandDetailsComponent,
    FormsComponent,
    WaterdetailsComponent,
    UgddetailsComponent,
    PodiComponent,
    AmulgamationComponent,
    SiteAreaChangeComponent,
    PropertyMutationComponent,
    UnAssessedpropoertyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    NgxDatatableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('service-worker.js', {
      enabled: environment.production,
    }),
    
  ],
  providers: [
    FloorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private i18nService: I18nConfigService) {
    this.i18nService.init();
    this.i18nService.loadTranslations().then(() => {
      // Do something when translations are loaded if needed
    });
  }
 }