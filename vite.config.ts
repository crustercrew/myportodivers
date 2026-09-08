import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import chatHandler from './api/chat'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY
  process.env.VITE_GEMINI_API_KEY = env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
  process.env.GOOGLE_API_KEY = env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY

  return {
    plugins: [
      react(),
      {
        name: 'api-chat-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            try {
              await chatHandler(req, res)
            } catch (err: any) {
              console.error('Local /api/chat error:', err)
              if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end(err?.message || 'Internal Server Error')
              }
            }
          })
        },
      },
    ],
    assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png'],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
