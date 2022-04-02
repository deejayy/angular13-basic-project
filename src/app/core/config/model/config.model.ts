export interface AppConfig {
  apiEndpoint: string;
  features?: Record<string, boolean | string>;
}
