import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Squads from './screens/squads/Squads';

import './index.css';
import SquadCreate from './screens/squads/SquadCreate';

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
      children: [
        {
          path: "/equipes/criar", 
          element: <SquadCreate />
        }
      ]
    }
  ],
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);