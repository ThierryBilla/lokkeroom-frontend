import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to avoid CORS issues and serve them correctly
      '/api': {
        target: 'http://localhost:3000',  // Remplacez par l'URL de votre serveur backend si elle est différente
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
