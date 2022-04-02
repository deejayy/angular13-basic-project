import { ApplicationInitStatus, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConnector, ApiInterface } from '@deejayy/api-caller';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

import { ConfigurationService } from '../config/service/config.service';
import { ApiErrorModalComponent } from '../component/error-modal/api-error-modal.component';

const ERROR_CODE_UNAUTHORIZED = 401;

@Injectable({
  providedIn: 'root',
})
export class ApiConnectorService extends ApiConnector {
  public override tokenData$: Observable<string> = of('');
  public override defaultApiUrl: string = 'http://localhost/';
  public override errorHandler = (payload: ApiInterface) => {
    if (!payload.request.localErrorHandling && payload.response.status === ERROR_CODE_UNAUTHORIZED) {
      this.authService.deauthenticate('/');
      return;
    }

    this.dialog.open<ApiErrorModalComponent>(ApiErrorModalComponent, {
      autoFocus: false,
      maxWidth: '360px',
      width: '360px',
    });
  };

  constructor(
    private config: ConfigurationService,
    private initStatus: ApplicationInitStatus,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
    super();
    this.initStatus.donePromise.then(() => {
      this.defaultApiUrl = this.config.get('apiEndpoint');
      this.tokenData$ = this.authService.token$;
    });
  }
}
