import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import RunApp from './components/RunApp.js';
import store from './store/index.js';
import 'react-toastify/dist/ReactToastify.css';

document.body.innerHTML = '<div class="h-100" id="container"></div>';
const container = document.getElementById('container');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RunApp />
    </Provider>
  </React.StrictMode>,
);
