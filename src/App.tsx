import { Suspense, lazy } from 'react'
import Loading from './components/ui/Loading'

// Lazy load components that are not needed for initial render
const MainLayout = lazy(() => import('./components/layout/MainLayout'))

// Add loading priority to critical images
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout />
    </Suspense>
  )
}

export default App
