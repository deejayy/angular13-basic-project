export class MockFeatureFlagService {
  public getFeatureSetting = jest.fn((x: string) => 'terminal' === x);
}
