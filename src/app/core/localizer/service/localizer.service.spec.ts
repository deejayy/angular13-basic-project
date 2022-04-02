import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LocalizerService } from './localizer.service';

jest.setSystemTime(new Date('2020-01-01').getTime());

const HTTP_ERROR_SAMPLE = 400;
const LOCALE_FILE_PATH = '/assets/i18n/messages.en-US.json?cache=1577836800000';

describe('LocalizerService', () => {
  let httpTestingController: HttpTestingController;
  let service: LocalizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizerService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LocalizerService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail to load defaults', () => {
    jest.spyOn(console, 'error').mockImplementation();

    service.loadMessages().catch((error) => {
      expect(error.status).toEqual(HTTP_ERROR_SAMPLE);
    });

    httpTestingController
      .expectOne(LOCALE_FILE_PATH)
      .error(new ErrorEvent('Fail for testing'), {
        status: HTTP_ERROR_SAMPLE,
        statusText: 'Random HTTP 400 error',
      });
  });
});
