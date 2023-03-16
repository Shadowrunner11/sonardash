import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import SkeletonApp from './components/SkeletonApp'

// eslint-disable-next-line no-console
addEventListener('error', console.trace)

const LazyApp = lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<SkeletonApp />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>
)
