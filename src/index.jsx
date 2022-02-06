import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import "./renderer/styles/core.scss"
import { StateProvider } from './renderer/utils/store.js';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <StateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </React.StrictMode>
    , document.getElementById('app'));
}

render();