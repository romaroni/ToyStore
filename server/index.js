import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// JSON body parsing (ready for future API routes)
app.use(express.json())

// Serve the built React app
app.use(express.static(join(__dirname, '../dist'), { maxAge: '1d' }))

// Health check — useful for monitoring / uptime checks
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'toycircle-uws', ts: new Date().toISOString() })
})

// SPA fallback — let React Router handle all other routes
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`ToyCircle UWS running on port ${PORT} [${process.env.NODE_ENV ?? 'development'}]`)
})
