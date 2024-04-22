import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  generateCaptcha(): { imageUrl: string; value: string } {
    // Implement your captcha generation logic here
    const captchaValue = this.generateRandomString(6); // Adjust the length as needed
    const captchaImageUrl = `https://dummyimage.com/150x50/000/fff&text=${captchaValue}`; // Replace with your actual captcha image URL
    return { imageUrl: captchaImageUrl, value: captchaValue };
  }

  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
