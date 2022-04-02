import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FeatureFlagService } from '../service/feature-flag.service';
import { MockFeatureFlagService } from '../service/mock-feature-flag.service';
import { FeatureRouteGuard } from './feature-route.guard';

describe('FeatureRouteGuard', () => {
  let guard: FeatureRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [FeatureRouteGuard, { provide: FeatureFlagService, useClass: MockFeatureFlagService }],
    });
    guard = TestBed.inject(FeatureRouteGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  describe('#canActivate', () => {
    const testCasesCanActivate: [string, ActivatedRouteSnapshot, boolean][] = [
      ['without data', {} as ActivatedRouteSnapshot, true],
      ['with invalid featureFlag', { data: { featureFlag: 'flag' } } as unknown as ActivatedRouteSnapshot, false],
      ['with valid featureFlag', { data: { featureFlag: 'terminal' } } as unknown as ActivatedRouteSnapshot, true],
    ];

    test.each(testCasesCanActivate)('%s', (_, args, expected) => {
      expect(guard.canActivate(args)).toBe(expected);
    });
  });
});
