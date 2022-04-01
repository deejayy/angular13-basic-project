import { TestBed } from '@angular/core/testing';
import { FeatureFlagService } from './feature-flag.service';
import { ConfigurationService } from '@core/config/service/config.service';

const TEST_VALUE = 2;

class MockConfigService {
  public get = (configValue: string) => {
    if (configValue === 'features') {
      return {
        'feature-1': true,
        'feature-2': false,
        'feature-3': undefined,
        'feature-4': [1, TEST_VALUE],
        'feature-5': { subFeature: true },
      };
    }
    return {};
  };
}

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureFlagService, { provide: ConfigurationService, useClass: MockConfigService }],
    });

    service = TestBed.inject(FeatureFlagService);
    result = undefined;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test.each([
    ['feature-0', undefined],
    ['feature-1', true],
    ['feature-2', undefined],
    ['feature-3', undefined],
    ['feature-4', [1, TEST_VALUE]],
    ['feature-5', { subFeature: true }],
  ])(
    'getFeatureSetting %#: %p',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (input: string, expected: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = service.getFeatureSetting(input);
      expect(result).toEqual(expected);
    },
  );
});
