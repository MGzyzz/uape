import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['7cad-2a03-32c0-18-c6-a9cf-aec8-bc72-d7c9.ngrok-free.app'],
  },
})
