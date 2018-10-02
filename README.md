# Yet Another Flick Viewer

## 1. Development tools

ESLint, Babel and Prettier are a bit confusing when integrating and make them working with VSCode. ESLint seems to not fully support imports sorting. `eslint-plugin-sort-imports-es6-autofix` seems a useful plugin for that purpose but it doesn't work fine. It enters in a formatting loop between ESLint built-in rules and this ESLint plugin. For instance, this is valid for ESLintwhen in fact it isn't:

```javascript
// ESLint valid
import ReactDOM from 'react-dom';
import React from 'react';
```
