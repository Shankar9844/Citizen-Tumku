import { Component, OnInit } from '@angular/core';
import { CaptchaService } from 'src/app/captcha.service';


@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  captchaImageUrl: string = '';
  captchaValue: string = '';
  userAnswer: string = '';
  isCaptchaInvalid: boolean = false;

  constructor(private captchaService: CaptchaService) {}

  ngOnInit(): void {
    this.refreshCaptcha();
  }

  refreshCaptcha(): void {
    const captchaInfo = this.captchaService.generateCaptcha();
    this.captchaValue = captchaInfo.value;
   localStorage.setItem("captcha", this.captchaValue)
    this.captchaImageUrl = captchaInfo.imageUrl;
    this.userAnswer = '';
    this.isCaptchaInvalid = false;
  }

  validateCaptcha(): void {
    this.isCaptchaInvalid = this.userAnswer !== this.captchaValue;
  }
}
