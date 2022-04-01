// eslint-disable-next-line no-shadow
export enum LanguageList {
  ENGLISH_US = 'en-US',
  HUNGARIAN = 'hu',
}

export const availableLanguages: string[] = [LanguageList.ENGLISH_US, LanguageList.HUNGARIAN];

export const languageMap = {
  [LanguageList.ENGLISH_US]: 'English',
  [LanguageList.HUNGARIAN]: 'Magyar',
};
