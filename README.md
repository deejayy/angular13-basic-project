# Angular 13 Basic Project Setup

Basic Angular 13 project bootstrap with some usually-needed extras. Check Features section for details.

Search for the keyword "projex" and replace it with your own project name.

Coding guides:

- [Angular coding style guide (Official)](https://angular.io/guide/styleguide)
- [Clean Code concepts adapted for TypeScript](https://github.com/labs42io/clean-code-typescript)

# Features

## Angular 13

Routing enabled, SCSS selected for stylesheets.  
Added some static files besides assets: favicons, manifest file.  
Build is adjusted to have a vendor chunk (ideally the less frequently changing file), separate material stylesheet - all these for efficient caching.  
`index.html` is tuned for NoJS and slow networks: loading and information messages to help users. Viewport is also adjusted.  

## NGRX

State manager prepared for Redux DevTools chrome extension, no global (root) appstate is installed, but metareducer added for authentication and user data loading (both stored in localStorage - see below).

## Code Quality Preservation

### Eslint, Stylelint, Prettier, .editorconfig

Preconfigured based on guides and daily experience.

Recommended plugins for VSCode:

- EditorConfig for VS Code
- ESLint
- Prettier - Code formatter
- Prettier ESLint

Format on save is useful to be set.

### Unit Testing: Jest

Global mocks added for localStorage, Google Analytics and Google Tag Manger. Some basic constructor tests were created as well.  
`ng test`, `npm run test` should work, unfortunately `npx jest` is failing after v12 -> v13 upgrade.  
To test individual files, run `ng test -- filename`.

## Configuration

Configuration is applied runtime at app initialization. Loading is blocked until the config is successfully loaded. Currently sitting in `/assets/config.json`, but can also be served from a backend endpoint (HttpClient is used). Check ConfigService on how to access settings (simple set/get).

Good practice to have different configuration for different environments (e.g. test vs. prod), the config location is defined in the `environment.ts` file (or environment.prod.ts for production build). To shield non-prod configs from curious users, it is useful to append a generated hash to the config file name, e.g. `config-dev-9f3bc173.json`, they won't show up in the production build and cannot be guessed based on naming convention (`config-prod.json` -> `config-dev.json` is obvious).

## Localization

Messages file in json format is serving localization of language tokens (/assets/i18n/*, loaded at app init). Everything is referenced with IDs (`@@tokenId`).  
(inconsistencies to be fixed yet: language ID, rely on locale id from browser, etc.)

### Example

In template:

```html
<a routerLink="/projects" i18n="@@menuItemProjects">projects</a>
```

In code:

```ts
public projectsTitle: string = $localize`:@@menuItemProjects:`;
```

Translations:

```json
{
  "menuItemProjects": "Projects"
}
```

For further info, check official angular localization documentation.

## Component Palette: Angular Material

Check `app-theme.scss` for colors, `material-theme.scss` for configuration.  
Font files for latin, latin-ext charsets and Material Icons are downloaded from Google Fonts and placed in `/assets/fonts`. Rare character sets (cyrillic, greek, vietnamese, etc) are referenced from Google Fonts CDN directly. Check `fonts.scss`.  

## Styling

Check `app-theme.scss` for colors, this is the place to define or include new colors as well, based on your design system.  
`modern-css-reset` package is used as browser reset css, inculded in `material-theme.scss` for optimal bundling reason.  

### Mixins for Responsive Design

Check `mixins.scss` for breakpoint definitions.

#### Responsive Media Query: `mq`

`mq` is used as block to provide width-based style modifications.

Examples:

```scss
.style1 {
  width: 920px;
  padding: 24px;

  @include mq(tablet-small) {
    width: 100%;
    padding: 12px;
  }
}

.style2 {
  margin: 48px;

  @include mq(tablet-small) {
    margin: 4px;
  }
}

// or

.style1 {
  width: 920px;
  padding: 24px;
}

.style2 {
  margin: 48px;
}

@include mq(tablet-small) {
  .style1 {
    width: 100%;
    padding: 12px;
  }

  .style2 {
    margin: 4px;
  }
}
```

#### Smart Scaling Logic for Boundary-Based Sizing: `smart-scale`

Usage: `smart-scale(min px, max px, screen width low boundary, screen width high boundary)`.

```scss
.style3 {
  font-size: smart-scale(12, 24);
  // will scale the font size from 12 to 24px from 320px to 1440px screen width proportionally
  // e.g. in 500px width it will be calculated as 12+(24-12)*((500-320)/(1440-320)) = 13.92px
  // better try it out, will make more sense
  padding: smart-scale(10, 20, 640, 1920);
  // will scale the padding from 10px to 20px from 640px to 1920px screen width proportionally

  @include mq(tablet-small) {
    padding: smart-scale(8, 10, 320, 640);
    // with a responsive breakpoint, the scaling can be adjusted differently, useful to match
    // the boundaries, though (in this case: 640px and 10px)
  }
}
```

## Feature Flag Module

Features can be defined in the `config.json` files under the `features` section. Flags can have any type of value, since the app logic will deal with them.

Example:

```json
(config-dev.json)
{
  ...
  "features": {
    "newFeatureEnabled": true
  }
}

(config-prod.json)
{
  ...
  "features": {
    "newFeatureEnabled": false
  }
}
```

```ts
  public newFeatureEnabled: boolean = this.featureFlagService.getFeatureSetting('newFeatureEnabled');

  if (this.featureFlagService.getFeatureSetting('newFeatureEnabled')) {
    this.doSomeLogic();
  }
```

```html
  <div *ngIf="newFeatureEnabled">
    Show the new feature
  </div>
```

## Page Title Service

(should be revised with Angular 14, it will include something similar)

This service provides title-changing functionality for the app. It can be automatic via route data or manually called. Title is stored in state manager and should have a default settings. Check `app.component.ts` for manual usage and automatic attachment to router settings.

```ts
const subRoutes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    data: { pageTitle: 'Project list' },
  },
];
```

## Authentication and User Data

The app is prepared for Bearer token authentication (together with api-caller, see below). Check `auth.serivce.ts` for interface (auth/deauth methods and token$ stream). Authenticated state is only determined based on the existence of the token in the localStorage. Validity is checked via `checkTokenValidity` method. LocalStorage key names are generated hashes stored in `storage-keys.ts` file. Instead of using `token` as key, which can be easily figured out by automatic data phising techniques, this way it is harder to guess whether the information can be exploited.

Managing user data is similar (e.g. if you need e-mail address/username/whatever persisted): `setUserData()` method and `userData$` stream.

## API Caller module

Backend API communication is handled by the [@deejayy/api-caller](https://www.npmjs.com/package/@deejayy/api-caller) library. Check it's readme for further info, has some examples as well. `ApiConnectorService` is prepared to provide necessary data for api-caller (like token, default endpoint url, error handling). `AuthService` is used to provide token information, `ConfigurationService` to get default endpoint URL. Since `ApiConnectorService` is a core service, hardcoding any of these informations is not advised.
