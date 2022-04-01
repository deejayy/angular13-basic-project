export interface AppConfig {
  apiEndpoint: string;
  features?: { [key: string]: boolean | string };
}
