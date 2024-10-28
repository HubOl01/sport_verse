
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Routers from './shared/router/Routers'
import Header from './shared/ui/Header'
import './tailwind.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <div className='block sm:flex sm:gap-10 h-fit min-h-screen mt-5 sm:mt-10'>
        <div className='w-full sm:w-1/4 bg-gray-900'>
          fdg
        </div>
        <div className="w-full sm:w-3/4 bg-red-600">

          <Routers></Routers>
        </div>

      </div>
    </BrowserRouter>
  </React.StrictMode >,
)