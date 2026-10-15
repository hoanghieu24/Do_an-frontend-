import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix __dirname trong ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    proxy: {
      '/ws': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        headers: {
          Origin: 'http://localhost:5173',
          Referer: 'http://localhost:5173/'
        }
      },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        headers: {
          Origin: 'http://localhost:5173',
          Referer: 'http://localhost:5173/'
        }
      },
      '/j_spring_security_check': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p,
        headers: {
          Origin: 'http://localhost:5173',
          Referer: 'http://localhost:5173/'
        }
      },
      '/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        headers: {
          Origin: 'http://localhost:5173',
          Referer: 'http://localhost:5173/'
        }
      },
      '/vtour': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        headers: {
          Origin: 'http://localhost:5173',
          Referer: 'http://localhost:5173/'
        }
      },
      '/uploads': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        headers: {
          Origin: 'http://localhost:5173',
          Referer: 'http://localhost:5173/'
        }
      },
      '/img': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        headers: {
          Origin: 'http://localhost:5173',
          Referer: 'http://localhost:5173/'
        }
      }
    }
  }
})
