import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { availableLanguages } from '../model/language-definitions';
import { LocalizerService } from './localizer.service';

export const getLocaleFromLocalStorage = () => {
  try {
    const language = window.localStorage.getItem('localeId');
    if (availableLanguages.includes(language as string)) {
      return language;
    }
  } catch {
    console.warn('Failed to get language setting from localStorage');
  }
  return;
};

export const localizerFactory = (localizerService: LocalizerService, locale: string) => {
  return async () => {
    const localeSetting = getLocaleFromLocalStorage();
    const localeId = localeSetting || locale;
    try {
      return localizerService.loadMessages(localeId);
    } catch (err) {
      console.error('Localization load failed, error:', err);
    }
  };
};

export const localizerProvider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [LocalizerService, LOCALE_ID],
  useFactory: localizerFactory,
};
