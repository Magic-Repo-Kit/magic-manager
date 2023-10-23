import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/system': {
        target: 'http://124.222.46.195:1000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/system/, ''),
      },
    },
  },
})

