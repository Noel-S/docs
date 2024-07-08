import { readableStreamToText } from 'bun';
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { unlink } from "node:fs/promises";

const app = new Hono()

app.get('/edit/:filename{.+\\.mdx{0,1}$}', serveStatic({ root: '../dist/edit', path: '/index.html', rewriteRequestPath(path) {
  console.log(path)
  return path
}, }))

app.use('/*', serveStatic({ root: '../dist' }))

app.get('/content/:filename{.+\\.mdx{0,1}$}', async (c) => {
  const { filename } = c.req.param()
  const content = await Bun.file(`../base/${filename}`).text()
  return c.text(content)
})

app.post('/save', async (c) => {
  try {
    const { old_file, new_file, move, content } = await c.req.json()
    await Bun.write(`../base/${new_file}`, content)
    if (move) {
      await unlink(`../base/${old_file}`)
    }
    return c.json({ status: 'ok' })
  } catch (error: any) {
    return c.json({ status: 'error', error: error.message })
  }
})

app.post('/publish', async (c) => {
  try {
    // build editor and base
    const { exited: baseBuildCode } = Bun.spawn(['bash', './publish.sh'], { cwd: '../cmd' })
    const base = await baseBuildCode
    if (base !== 0) {
      return c.json({ status: 'error' })
    }
    return c.json({ status: 'ok' })
  } catch (error: any) {
    console.error(error)
    return c.json({ status: 'error', error: error.message })
  }
})

export default app
