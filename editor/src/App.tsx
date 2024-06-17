// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from '@radix-ui/react-icons'
import { ThemeProvider } from '@/components/theme-provider'
import CodeEditor from '@uiw/react-textarea-code-editor'
// import markdownit from 'markdown-it'
import { useRef } from 'react'
// const md = markdownit()
import { marked } from 'marked'

function App() {
  const htmlRef = useRef<HTMLDivElement>(null)
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
                marked.parse(evn.target.value, { async: true }).then((html) => {
                  htmlRef.current!.innerHTML = html
                });
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
          <ResizablePanel>
            <section ref={htmlRef} >

            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </ThemeProvider>
  )
}

export default App
