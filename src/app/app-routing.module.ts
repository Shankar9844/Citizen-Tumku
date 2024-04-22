import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './GlobalComponent/login/login.component';
import { RegisterpageComponent } from './GlobalComponent/registerpage/registerpage.component';
import { DashboardComponent } from './GlobalComponent/dashboard/dashboard.component';
import { ProfileComponent } from './Securedcomponents/profile/profile.component';
import { OnlineapplicationsComponent } from './Securedcomponents/onlineapplications/onlineapplications.component';
import { SearchDetailsComponent } from './Securedcomponents/search-details/search-details.component';
import { DashboardReportComponent } from './Securedcomponents/dashboard-report/dashboard-report.component';
import { GrievanceComponent } from './Securedcomponents/grievance/grievance.component';
import { AuthGuard } from './auth.guard';
import { FaqComponent } from './infopages/faq/faq.component';
import { SASDeclarationComponent } from './onlineForms/sasdeclaration/sasdeclaration.component';
import { HistoryComponent } from './Securedcomponents/Grievance/history/history.component';
import { NewPropertyRegistrationComponent } from './onlineForms/new-property-registration/new-property-registration.component';
import { DemandDetailsComponent } from './infopages/demand-details/demand-details.component';
import { WaterdetailsComponent } from './Securedcomponents/waterdetails/waterdetails.component';
import { UgddetailsComponent } from './Securedcomponents/ugddetails/ugddetails.component';
import { PodiComponent } from './onlineForms/podi/podi.component';
import { AmulgamationComponent } from './onlineForms/amulgamation/amulgamation.component';

import { SiteAreaChangeComponent } from './onlineForms/site-area-change/site-area-change.component';
import { PropertyMutationComponent } from './onlineForms/property-mutation/property-mutation.component';
import { UnAssessedpropoertyComponent } from './onlineForms/un-assessedpropoerty/un-assessedpropoerty.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterpageComponent },
  { path: 'OnlineServices', component: DashboardComponent },
  { path: 'Profile', component: ProfileComponent ,canActivate: [AuthGuard]},
  { path: 'OnlineApplication', component: OnlineapplicationsComponent },
  { path: 'Search', component: SearchDetailsComponent },
  { path: 'Dashboard', component: DashboardReportComponent, canActivate: [AuthGuard]},
  { path: 'grievance', component: GrievanceComponent, canActivate: [AuthGuard]},
  { path: 'GrievanceHistory', component: HistoryComponent, canActivate: [AuthGuard]},
  { path: 'SasDeclaration', component: SASDeclarationComponent },
  { path: 'Propertyregistration', component: NewPropertyRegistrationComponent},
  { path: 'Podi', component: PodiComponent},
  { path: 'amulgamation', component: AmulgamationComponent},
  { path:'PropertyMutation',component:PropertyMutationComponent},
  { path:'SiteArea',component:SiteAreaChangeComponent},
  { path:'Un-Assessed',component:UnAssessedpropoertyComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'demandDetails', component: DemandDetailsComponent},
  { path:'WaterSearch',component:WaterdetailsComponent},
  { path:'UGD',component:UgddetailsComponent},
  

  {path:'**', redirectTo: 'OnlineServices'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
