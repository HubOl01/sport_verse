
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
        <div className=' min-h-screen'>

          {location.pathname !== '/login' && (<Header />)}
          <div className='block sm:flex h-fit min-h-screen'>
            {location.pathname !== '/login' && (
              <div className='w-full sm:w-1/5 bg-gray-900' style={{ width: "350px" }}>
                <LeftBar />
              </div>
            )}
            <div className={`w-full ${location.pathname !== '/login' && ('sm:w-4/5')}`}>

              <Routers></Routers>
            </div>

          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>

  </React.StrictMode >,
)