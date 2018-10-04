# Yet Another Flick Viewer

## 1. Install and Run

Install dependencies and start listening on `localhost:3000`.

```bash
npm install
npm run start:dev
```

## 2. Development tools

ESLint, Babel and Prettier are a bit confusing when integrating and make them working with VSCode. ESLint seems to not fully support imports sorting. `eslint-plugin-sort-imports-es6-autofix` seems a useful plugin for that purpose but it doesn't work fine. It enters in a formatting loop between ESLint built-in rules and this ESLint plugin. For instance, this is valid for ESLintwhen in fact it isn't:

```javascript
// ESLint valid
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { takeUntil, map } from 'rxjs/operators';
```

## 3. Specific environment configuration

The Flickr API key and secret are stored in a `dotenv` file and available inside the `process.env` global object. For instance:

```javascript
process.env.FLICKR_API_KEY
process.env.FLICKR_API_SECRET
```

For each environment there is a dotenv file. These settings are transferred to the React app by the `DefinePlugin` Webpack plugin.

Another alternative is to create a regular JavaScript file exporting an object to allow a more sofisticated configuration and using the `NormalModuleReplacementPlugin` Webpack plugin to replace the file depending on the environment during build time. Then this file can be imported when needed by the components instead of having a global variable like `process.env`.

```javascript
export default {
  flickr: {
    key: ...,
    secret: ...
  }
}
```

For this sample project the first approach has been used because it seems valid and wide-used by the React community but I prefer the second one. Angular CLI implements the second approach and it feels more cleaner and avoids polluting the global namespace.

## 4. Asynchronicity / Reactive programming

All the asynchronous calls to the Flickr API have been implemented by using RxJs. Once you get used to reactive programming you will never go back to plain promises.

For each image preview, the username of the owner must be shown. This information comes from a second call to the Flickr API from the image id previously fetched. All these calls are executed in parallel and after rendering the images themselves.

## 5. Image pages

An infinite scroll with a page size of 10 images has been implemented by using the `react-infinite-scroller` package to improve usability. The gallery is responsive to any screen size.
