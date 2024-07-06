import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('/edit/*', serveStatic({ root: '../editor/dist', rewriteRequestPath(path) {
  return path.replace(/^\/editor/, '')
}, }))

app.get('/edit/:filename{.+\\.md$}', serveStatic({ root: '../editor/dist', path: '/index.html', rewriteRequestPath(path) {
  console.log('path', path)
  return path.replace(/^\/editor/, '')
}}))

app.use('/*', serveStatic({ root: '../base/dist' }))

export default app
