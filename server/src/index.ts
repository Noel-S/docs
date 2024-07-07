import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { unlink } from "node:fs/promises";

const app = new Hono()

app.get('/edit/:filename{.+\\.mdx{0,1}$}', serveStatic({ root: '../base/dist/edit', path: '/index.html' }))

app.use('/*', serveStatic({ root: '../base/dist' }))

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
    const { stderr } = Bun.spawn(['npm', 'run', 'astro', 'build'], { cwd: '../base' })
    if (stderr) {
      return c.json({ status: 'error' })
    }
    console.log('published')
    return c.json({ status: 'ok' })
  } catch (error: any) {
    return c.json({ status: 'error', error: error.message })
  }
})

export default app
