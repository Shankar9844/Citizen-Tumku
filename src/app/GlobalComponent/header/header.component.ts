import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { I18nConfigService } from 'src/app/i18n-config.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Name:any;
  MobileNo:any;
  loggedin:boolean=false;
  constructor(private i18nConfigService: I18nConfigService,private authService: AuthService) {
   
   }
   get isLoggedIn(): boolean {
    this.Name= localStorage.getItem('Name')
    this.MobileNo= localStorage.getItem('MobNo')
    return this.authService.getLoginStatus();
    
  }

  onLogout(){
    this.authService.logout();
  }
 
  switchLanguage(language: string) {
    // Assuming you are using a translation service, you can set the language here
    this.i18nConfigService.setLanguage(language);
   
    // Additional logic to update translations or perform other tasks based on the selected language

    // If you want to set the language to English when the English button is clicked
    if (language === 'en') {
      this.i18nConfigService.setLanguage('en');
     
    }else{
      this.i18nConfigService.setLanguage('kn');
      
    }
  }
}
