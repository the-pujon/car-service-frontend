import { Suspense, lazy, useEffect, useState, startTransition } from 'react'
import Loading from './components/ui/Loading'

// Lazy load components that are not needed for initial render
const MainLayout = lazy(() => import('./components/layout/MainLayout'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    startTransition(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <MainLayout />
    </Suspense>
  )
}

export default App
