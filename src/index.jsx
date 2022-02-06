import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx'
import "./renderer/styles/core.scss"
import { StateProvider } from './renderer/utils/store.js';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <StateProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </StateProvider>
    </React.StrictMode>
    , document.getElementById('app'));
}

render();