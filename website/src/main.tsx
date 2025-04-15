import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Routers from './shared/router/Routers'
import Header from './shared/ui/Header/Header'
import './tailwind.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import LeftBar from './shared/ui/LeftBar/LeftBar'
import LeftBarAdmin from './shared/ui/LeftBar/LeftBarAdmin'
import { CurrentRole, Roles } from './shared/data/roles'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='w-full min-h-screen'>

          {location.pathname !== '/login' && location.pathname !== '/register' ? <Header /> : <></>}
          <div className='block sm:flex h-fit min-h-screen'>
            {location.pathname !== '/login' && location.pathname !== '/register' ? (

              <div className='w-full sm:w-1/6 bg-gray-900' style={{ minWidth: "300px" }}>
                {CurrentRole === Roles.ADMIN ? <LeftBarAdmin /> : <LeftBar />}
              </div>
            ) : <></>}
            <div className={`w-full  ${location.pathname !== '/login' && location.pathname !== '/register'}`}>

              <Routers></Routers>
            </div>

          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>

  </React.StrictMode >,
)