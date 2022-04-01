import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../auth/service/auth.service';
import { AuthFacade } from '../auth/store/auth.facade';
import { MockAuthFacade } from '../auth/store/mock-auth.facade';
import { ConfigModule } from '../config/config.module';

import { ApiConnectorService } from './api-connector.service';
import { ApiErrorModalComponent } from '../component/error-modal/api-error-modal.component';

const MATERIAL = [MatButtonModule, MatDialogModule];

describe('ApiConnectorService', () => {
  let service: ApiConnectorService;
  const authFacade: MockAuthFacade = new MockAuthFacade();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiErrorModalComponent],
      imports: [ConfigModule, HttpClientModule, ...MATERIAL],
      providers: [ApiConnectorService, AuthService, { provide: AuthFacade, useValue: authFacade }],
    });
    service = TestBed.inject(ApiConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
