import './polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { App } from './app/app';

Modal.setAppElement('#app');

ReactDOM.render(<App />, document.getElementById('app'));
