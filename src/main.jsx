import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import DarkModeProvider from '@/components/DarkModeProvider'; //黑暗模式
import App from './App';
import '@/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>
);
