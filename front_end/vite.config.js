import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const extraHosts = env.NGROK_HOST
    ? env.NGROK_HOST.split(',').map(h => h.trim()).filter(Boolean)
    : []

  const apiTarget = env.VITE_API_TARGET ?? 'http://localhost:8000'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      allowedHosts: [...extraHosts],
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true },
        '/media': { target: apiTarget, changeOrigin: true },
      },
    },
  }
})
