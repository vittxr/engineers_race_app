import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Orders from './screens/Orders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './screens/Login';
import { AuthProvider } from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Clients from './screens/clients/Clients';
import Client from './screens/clients/Client';
import Sellers from './screens/sellers/Sellers';
import Seller from './screens/sellers/Seller';
import Squads from './screens/squads/Squads';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    },
  },
});

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Squads />,
    },
    {
      path: "/equipes", 
      element: <Squads />,
    }
  ],
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);