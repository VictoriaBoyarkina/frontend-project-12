import React from 'react';
import { createRoot }from 'react-dom/client';
import './index.css';
import App from './App';

document.body.innerHTML = '<div class="h-100" id="container"></div>';
const container = document.getElementById('container')
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
