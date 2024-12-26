import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './index.css'
import { AppRoutes } from './routes/routes'
import { Toaster } from 'sonner'
// import { AppRoutes } from './routes/Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <AppRoutes />
      <Toaster position='top-center' className='text-white' richColors />
    </Provider>
  </>
)
