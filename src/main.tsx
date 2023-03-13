import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// eslint-disable-next-line no-console
addEventListener('error', console.trace)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
