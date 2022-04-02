const TEST_VALUE = 2;

export class MockConfigService {
  public get = (configValue: string) => {
    if (configValue === 'googleTagId') {
      return 'TEST-GTAG';
    }
    if (configValue === 'features') {
      return {
        'feature-1': true,
        'feature-2': false,
        'feature-3': undefined,
        'feature-4': [1, TEST_VALUE],
        'feature-5': { subFeature: true },
      };
    }
    return '';
  };
  public loadAppConfig = () => {
    return '';
  };
}
