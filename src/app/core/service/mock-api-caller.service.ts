import { of } from 'rxjs';

export class MockApiCallerService {
  public getDefaultApiUrl = () => {
    return null;
  };

  public callApi = () => {
    return null;
  };

  public resetApi = () => {
    return null;
  };

  public createApiResults = () => {
    return {
      loading$: of(false),
      success$: of(false),
      error$: of(false),
      data$: of({}),
      errorData$: of(null),
    };
  };

  public makeRequest = () => {
    return null;
  };

  public handleError = () => {
    return null;
  };
}
