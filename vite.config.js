import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'https://coraqr-back2.onrender.com/', 
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''), 
    }
  } 
})
