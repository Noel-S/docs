import { CodeIcon, FontBoldIcon, FontItalicIcon, HeadingIcon, ImageIcon, Link1Icon, ListBulletIcon  } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function Sidebar() {
  return (
    <aside className='h-full flex flex-col p-2 gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <HeadingIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='ml-11 -mt-11' >
          <DropdownMenuLabel>Heading</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>H1</DropdownMenuItem>
          <DropdownMenuItem>H2</DropdownMenuItem>
          <DropdownMenuItem>H3</DropdownMenuItem>
          <DropdownMenuItem>H4</DropdownMenuItem>
          <DropdownMenuItem>H5</DropdownMenuItem>
          <DropdownMenuItem>H6</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" size="icon">
        <FontBoldIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <FontItalicIcon className="h-4 w-4" />
      </Button>
      <DropdownMenuSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <ListBulletIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='ml-11 -mt-11' >
          <DropdownMenuLabel>List</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Numbered</DropdownMenuItem>
          <DropdownMenuItem>Unordered</DropdownMenuItem>
          <DropdownMenuItem>Checklist</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenuSeparator />
      <Button variant="outline" size="icon">
        <Link1Icon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <CodeIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <ImageIcon className="h-4 w-4" />
      </Button>
    </aside>
  )
}