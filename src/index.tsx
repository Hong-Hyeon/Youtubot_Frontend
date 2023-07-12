import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import router from './router';
import {RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google'

const client = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GoogleClientId = '943691058272-2gap6eic690flr5l1li8rq2gmrvglqvs.apps.googleusercontent.com'

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <GoogleOAuthProvider clientId={GoogleClientId}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);