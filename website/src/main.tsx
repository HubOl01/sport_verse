import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './tailwind.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppLayout } from './AppLayout'
import { AuthProvider } from './shared/utils/useAuth';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode >,
)