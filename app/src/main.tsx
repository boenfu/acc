import 'antd/dist/antd.less';

import {configure} from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import {App} from './app';

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
