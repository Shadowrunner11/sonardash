import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'

import { DefaultLazy } from './components/DefaultLazy'

// eslint-disable-next-line no-console
addEventListener('error', console.trace)

const LazyApp = lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DefaultLazy>
      <LazyApp />
    </DefaultLazy>
  </React.StrictMode>
)
