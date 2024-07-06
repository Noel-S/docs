import './App.css'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from '@radix-ui/react-icons'
import { ThemeProvider } from '@/components/theme-provider'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { useMemo, useRef } from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkHtml from 'remark-html'
import { rehype } from 'rehype'
import rehypeShiki from '@shikijs/rehype'

function App() {
  const htmlRef = useRef<HTMLDivElement>(null)
  const parser = useMemo(() => {
    return remark().use(remarkGfm).use(remarkSmartypants).use(remarkHtml)
  }, [])
  const htmlparser = useMemo(() => {
    return rehype().use(rehypeShiki, { theme: 'tokyo-night' })
  }, [])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className='main'>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={30}>
            <section className='flex flex-col h-full'>
            <CodeEditor
              language="markdown"
              placeholder="Please enter JS code."
              onChange={(evn) => {
                parser.process(evn.target.value).then((file) => {
                  htmlparser.process(file).then((file) => {
                    htmlRef.current!.innerHTML = String(file)
                  })
                })
              }}
              padding={15}
              style={{
                height: '100%',
                maxHeight: '100%',
                overflow: 'auto',
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
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
