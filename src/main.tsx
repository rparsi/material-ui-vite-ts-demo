import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import DefaultPage from './pages/default';
import TableDemoPage from './pages/tabledemo';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultPage />,
  },
  {
    //path: '/:something', // This defines the dynamic parameter
    path: 'tabledemo',
    element: <TableDemoPage />,
  },
  {
    path: '*', // Catch-all for undefined routes
    element: <DefaultPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
