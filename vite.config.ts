import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { dependencies } from './package.json'
import { dependencies as raDependencies } from './node_modules/react-admin/package.json'

const vendor = [ 'react', 'react-router-dom', 'react-dom', 'react-router' ]

function renderChunks(deps: Record<string, string>) {
  const chunks = {}
  Object.keys(deps).forEach((key) => {
    if (vendor.includes(key)) return
    chunks[key] = [ key ]
  })
  return chunks
}

const allDeps = {
  ...dependencies,
  ...raDependencies,
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  resolve: {
    alias: {
      '@config': resolve(__dirname, './src/config'),
    },
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor,
          ...renderChunks(allDeps),
        },
      },
    },
  },
})
