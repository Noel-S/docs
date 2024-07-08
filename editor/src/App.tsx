import app from './App.module.css'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ThemeProvider } from '@/components/theme-provider'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import { langs } from '@uiw/codemirror-extensions-langs'
import { useEffect, useMemo, useRef } from 'react'
import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkSmartypants from 'remark-smartypants'
import rehypeShiki from '@shikijs/rehype'
import Sidebar from './components/ui/sidebar'
import { Separator } from './components/ui/separator'
import Header from './components/ui/header'
import { remark } from 'remark'
import { Toaster } from './components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const pathRef = useRef<string|null>(null)
  const markdownRef = useRef<ReactCodeMirrorRef>(null)
  const htmlRef = useRef<HTMLDivElement>(null)

  const markdownparser = useMemo(() => {
    return remark()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkGfm)
      .use(remarkSmartypants)
      .use(remarkRehype)
      .use(rehypeStringify)
      .use(rehypeShiki, { theme: 'tokyo-night' })
  }, [])

  useEffect(() => {
    if (!markdownRef.current) return
    if (!htmlRef.current) return
    if (!markdownparser) return
    if (!window) return

    const pathname = window.location.pathname
    pathRef.current = pathname.replace(/^\/edit/, '')
    if (pathRef.current.endsWith('md') || pathRef.current.endsWith('mdx')) {
      fetch(`/content${pathRef.current}`).then((res) => res.text()).then((insert) => {
        markdownRef.current!.view?.dispatch({ changes: { from: 0, to: 0, insert }})
      })
    }
  }, [markdownparser])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header onSave={() => {
          if (!pathRef.current) return
          fetch('/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              old_file: null,
              new_file: pathRef.current,
              move: false,
              content: markdownRef.current!.view?.state.doc.toString()
            })
          }).then((res) => res.json()).then((data) => {
            if (data.status === 'error') {
              toast("Error saving file", {
                description: data.error,
              })
              return
            }
            toast("File saved", {
              description: "The file was saved correctly",
            })
          })
        }} />
        <Separator />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <section className='flex h-full'>
              <Sidebar />
              <CodeMirror 
                height="100%" 
                width='100%'
                style={{ height: '100%', maxHeight: '100%', width: '100%', overflow: 'auto', fontSize: '16px' }}
                ref={markdownRef}
                extensions={[langs.markdown()]} 
                theme={tokyoNight}
                onChange={(value) => {
                  markdownparser.process(value).then((file) => {
                    htmlRef.current!.innerHTML = String(file)
                  })
                }}
              />
            </section>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={40} style={{overflowY: 'auto'}}>
            <section ref={htmlRef} className={app['sl-markdown-content']}></section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
