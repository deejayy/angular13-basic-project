import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfig } from '@core/config/model/config.model';

import { ConfigurationService } from './config.service';

const HTTP_ERROR_SAMPLE = 400;

jest.useFakeTimers();
jest.setSystemTime(new Date('2020-01-01').getTime());

describe('ConfigurationService', () => {
  let httpTestingController: HttpTestingController;
  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigurationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail to load defaults', () => {
    jest.spyOn(console, 'error').mockImplementation();

    service.loadAppConfig().catch((error) => {
      expect(error.status).toEqual(HTTP_ERROR_SAMPLE);
    });

    httpTestingController
      .expectOne('/assets/config.json?cache=1577836800000')
      .error(new ErrorEvent('Fail for testing'), {
        status: HTTP_ERROR_SAMPLE,
        statusText: 'Random HTTP 400 error',
      });
  });

  it('should throw because no config loaded', () => {
    try {
      service.get('random' as keyof AppConfig);
    } catch (error) {
      expect(error).toEqual(Error('Config file not loaded!'));
    }
  });

  it('should get a value from config', () => {
    service
      .loadAppConfig()
      .then(() => {
        expect(service.get('apiEndpoint')).toEqual('api-endpoint.local');
      })
      .catch((error) => console.error(error));

    httpTestingController
      .expectOne('/assets/config.json?cache=1577836800000')
      .flush({ apiEndpoint: 'api-endpoint.local' });
  });

  it('should set and get a value from config', () => {
    service
      .loadAppConfig()
      .then(() => {
        expect(service.get('apiEndpoint')).toEqual('api-endpoint.local');
        service.set('apiEndpoint', 'new-api.local');
        expect(service.get('apiEndpoint')).toEqual('new-api.local');
        service.set('testKey' as keyof AppConfig, 'testValue');
        expect(service.get('testKey' as keyof AppConfig)).toEqual('testValue');
      })
      .catch((error) => console.error(error));

    httpTestingController
      .expectOne('/assets/config.json?cache=1577836800000')
      .flush({ apiEndpoint: 'api-endpoint.local' });
  });
});
