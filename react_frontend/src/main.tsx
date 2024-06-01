import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Squads from './screens/squads/Squads';

import './index.css';
import SquadCreate from './screens/squads/SquadCreate';
import SquadUpdate from './screens/squads/SquadUpdate';
import Tests from './screens/tests/Tests';
import TestCreate from './screens/tests/TestCreate';
import Podium from './screens/podium/Podium';
import TestUpdate from './screens/tests/TestUpdate';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Navigate to="equipes" />,
  },
  {
    path: '/',
    element: <Navigate to="equipes" />,
  },
  {
    path: '/equipes',
    element: <Squads />,
    children: [
      {
        path: '/equipes/criar',
        element: <SquadCreate />,
      },
      {
        path: '/equipes/:id',
        element: <SquadUpdate />,
      },
    ],
  },
  {
    path: '/provas',
    element: <Tests />,
  },
  {
    path: '/provas/criar',
    element: <TestCreate />,
  },
  {
    path: '/provas/:id',
    element: <TestUpdate />,
  },
  {
    path: '/podium',
    element: <Podium />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);
