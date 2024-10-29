
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Routers from './shared/router/Routers'
import Header from './shared/ui/Header/Header'
import './tailwind.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import LeftBar from './shared/ui/LeftBar/LeftBar'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <div className='block sm:flex sm:gap-10 h-fit min-h-screen mt-5 sm:mt-10'>
          <div className='w-full sm:w-1/4 bg-gray-900'>
            <LeftBar />
          </div>
          <div className="w-full sm:w-3/4 bg-red-600">

            <Routers></Routers>
          </div>

        </div>
      </BrowserRouter>
    </QueryClientProvider>

  </React.StrictMode >,
)