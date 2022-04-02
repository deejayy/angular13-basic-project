import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadTranslations } from '@angular/localize';

import { LanguageList } from '../model/language-definitions';

export const localize = (id: string): string => {
  const template: TemplateStringsArray = Object.assign({ raw: [id] }, [id]);
  return $localize(template);
};

@Injectable()
export class LocalizerService {
  public selectedLanguage: string = LanguageList.ENGLISH_US;

  constructor(private http: HttpClient) {}

  public async loadMessages(locale: string = LanguageList.ENGLISH_US): Promise<void> {
    this.selectedLanguage = locale;

    return this.http
      .get(`/assets/i18n/messages.${locale}.json?cache=${new Date().getTime()}`)
      .toPromise()
      .then((data) => {
        loadTranslations(data as Record<string, string>);
      })
      .catch((reason) => {
        console.error(reason);
      });
  }
}
