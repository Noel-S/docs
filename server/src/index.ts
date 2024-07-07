import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { unlink } from "node:fs/promises";

const app = new Hono()

app.get('/edit/:filename{.+\\.mdx{0,1}$}', serveStatic({ root: '../base/dist/edit', path: '/index.html', rewriteRequestPath(path) {
  console.log(path)
  return path
}, }))

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
    // build editor and base
    const { exited: baseBuildCode } = Bun.spawn(['npm', 'run', 'astro', 'build'], { cwd: '../base' })
    const base = await baseBuildCode
    if (base !== 0) {
      return c.json({ status: 'error' })
    }

    const { exited: editorBuildCode } = Bun.spawn(['npm', 'run', 'build'], { cwd: '../editor' })
    const editor = await editorBuildCode
    console.log(editor)
    if (editor !== 0) {
      return c.json({ status: 'error' })
    }

    // publish to github
    const { exited: gitAddCode } = Bun.spawn(['git', 'add', '.'], { cwd: '../' })
    const gitAdd = await gitAddCode
    if (gitAdd !== 0) {
      return c.json({ status: 'error' })
    }

    const { exited: gitCommitCode } = Bun.spawn(['git', 'commit', '-m', 'published docs files'], { cwd: '../' })
    const gitCommit = await gitCommitCode
    if (gitCommit !== 0) {
      return c.json({ status: 'error' })
    }

    const { exited: gitPushCode } = Bun.spawn(['git', 'push'], { cwd: '../' })
    const gitPush = await gitPushCode
    if (gitPush !== 0) {
      return c.json({ status: 'error' })
    }
    
    return c.json({ status: 'ok' })
  } catch (error: any) {
    return c.json({ status: 'error', error: error.message })
  }
})

export default app
