import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('/editor/*', serveStatic({ root: '../editor/dist', rewriteRequestPath(path) {
  return path.replace(/^\/editor/, '')
}, }))

app.use('/*', serveStatic({ root: '../base/dist' }))

export default app
