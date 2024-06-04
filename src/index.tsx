import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  
  <ThemeProvider theme={theme}> {/* Wrap your app with the theme */}

<BrowserRouter>

<App />
</BrowserRouter>
</ThemeProvider>
  </React.StrictMode>
);
