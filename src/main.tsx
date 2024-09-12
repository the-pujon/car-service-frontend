
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store} >
      <RouterProvider router={router} />
      <Toaster position='top-center' className='text-white' richColors />
    </Provider>
  </>,
)
