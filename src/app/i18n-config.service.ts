import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nConfigService {
  constructor(private translate: TranslateService, private http: HttpClient) {}

  init() {
    // Set 'kn' (Kannada) as the default language
    this.translate.setDefaultLang('kn');

    // Supported languages
    this.translate.addLangs(['en', 'kn', 'fr', 'es']);

    // Use 'kn' as the default language
    this.translate.use('kn');
  }

  loadTranslations(): Promise<void> {
    // Path to your translation files
    const path = './assets/i18n/';

    // Configure the loader
    const translationsPromises = ['en', 'kn'].map((lang) =>
      firstValueFrom(this.http.get(`${path}${lang}.json`).pipe(), { defaultValue: {} })
        .then((translations) => this.translate.setTranslation(lang, translations))
    );

    // Add more languages as needed

    // Initialize translations using a common key, such as "FORM_TITLE"
    return Promise.all(translationsPromises)
      .then(() => firstValueFrom(this.translate.get('FORM_TITLE')))
      .then((translation) => {
        console.log('Translation loaded successfully:', translation);
      })
      .catch((error) => {
        console.error('Error loading translation:', error);
      });
  }

  setLanguage(language: string): void {
    // Set the language dynamically
    this.translate.use(language);
  }
}

// Http loader factory function for TranslateModule
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
