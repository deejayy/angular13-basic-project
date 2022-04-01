import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ConfigModule } from '../config/config.module';
import { ApiConnectorService } from './api-connector.service';

describe('ApiConnectorService', () => {
  let service: ApiConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule, HttpClientModule],
      providers: [ApiConnectorService],
    });
    service = TestBed.inject(ApiConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
