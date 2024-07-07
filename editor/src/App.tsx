import './App.css'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ThemeProvider } from '@/components/theme-provider'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import { langs } from '@uiw/codemirror-extensions-langs'
import { useEffect, useMemo, useRef } from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkHtml from 'remark-html'
import { rehype } from 'rehype'
import rehypeShiki from '@shikijs/rehype'
import Sidebar from './components/ui/sidebar'
import { Separator } from './components/ui/separator'
import Header from './components/ui/header'

function App() {
  const pathRef = useRef<string|null>(null)
  const markdownRef = useRef<ReactCodeMirrorRef>(null)
  const htmlRef = useRef<HTMLDivElement>(null)

  const markdownparser = useMemo(() => {
    return remark().use(remarkGfm).use(remarkSmartypants).use(remarkHtml)
  }, [])

  const htmlparser = useMemo(() => {
    return rehype().use(rehypeShiki, { theme: 'tokyo-night' })
  }, [])

  useEffect(() => {
    if (!markdownRef.current) return
    if (!htmlRef.current) return
    if (!htmlparser) return
    if (!markdownparser) return
    if (!window) return

    const pathname = window.location.pathname
    pathRef.current = pathname.replace(/^\/edit/, '')
    if (pathRef.current.endsWith('md') || pathRef.current.endsWith('mdx')) {
      fetch(`/content${pathRef.current}`).then((res) => res.text()).then((insert) => {
        markdownRef.current!.view?.dispatch({ changes: { from: 0, to: 0, insert }})
      })
    }
  }, [htmlparser, markdownparser])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className='main'>
        <Header />
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
                    htmlparser.process(file).then((file) => {
                      htmlRef.current!.innerHTML = String(file)
                    })
                  })
                }}
              />
            </section>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={40} style={{overflowY: 'auto'}}>
            <section ref={htmlRef} className='sl-markdown-content'></section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </ThemeProvider>
  )
}

export default App
