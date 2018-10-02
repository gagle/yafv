# Yet Another Flick Viewer

## 1. Development tools

ESLint, Babel and Prettier are a bit confusing when integrating and make them working with VSCode. ESLint seems to not fully support imports sorting. `eslint-plugin-sort-imports-es6-autofix` seems a useful plugin for that purpose but it doesn't work fine. It enters in a formatting loop between ESLint built-in rules and this ESLint plugin. For instance, this is valid for ESLintwhen in fact it isn't:

```javascript
// ESLint valid
import * as ReactDOM from 'react-dom';
import * as React from 'react';
```

## 2. Specific environment configuration

The Flickr API key and secret are stored in a `dotenv` file and available inside the `process.env` global object. For instance:

```javascript
process.env.FLICKR_API_KEY
process.env.FLICKR_API_SECRET
```

For each environment there is a dotenv file. These settings are transferredto the React app by the `DefinePlugin` Webpack plugin.

Another alternative is to create a regular JavaScript file exporting an object to allow a more sofisticated configuration and using the `NormalModuleReplacementPlugin` Webpack plugin to replace the file depending on the environment.

```javascript
export default {
  flickr: {
    key: ...,
    secret: ...
  }
}
```
