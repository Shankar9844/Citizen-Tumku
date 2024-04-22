import { Component } from '@angular/core';
import { PushNotificationService } from './push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TCUDP';
  
  
  constructor(private pushNotificationService: PushNotificationService) {}

  ngOnInit() {
  
    
  }
  
  
  
    
}
