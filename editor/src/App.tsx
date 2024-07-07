import './App.css'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from '@radix-ui/react-icons'
import { ThemeProvider } from '@/components/theme-provider'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
// import { markdown } from '@codemirror/lang-markdown';
import { langs } from '@uiw/codemirror-extensions-langs'
import { useEffect, useMemo, useRef } from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkHtml from 'remark-html'
import { rehype } from 'rehype'
import rehypeShiki from '@shikijs/rehype'

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
    // console.log('pathname', pathRef.current)
    if (pathRef.current.endsWith('md') || pathRef.current.endsWith('mdx')) {
      fetch(`/content${pathRef.current}`).then((res) => res.text()).then((insert) => {
        markdownRef.current!.view?.dispatch({ changes: { from: 0, to: 0, insert }})
      })
    }
  }, [htmlparser, markdownparser])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className='main'>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={30}>
            <section className='flex flex-col h-full' >
            {/* <div id="editor" ref={markdownRef} ></div> */}
            <CodeMirror 
              height="100%" 
              style={{ height: '100%', maxHeight: '100%', overflow: 'auto' }}
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
            <ToggleGroup type="single" onValueChange={console.log} className="p-2" >
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <FontBoldIcon className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <FontItalicIcon className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                <UnderlineIcon className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            </section>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={40} style={{overflowY: 'auto'}}>
            <section ref={htmlRef} className='sl-markdown-content' >
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </ThemeProvider>
  )
}

export default App
