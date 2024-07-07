import { Button } from './button'
import { CopyIcon, DotsHorizontalIcon, GlobeIcon, Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './breadcrumb'

export default function Header() {
  return (
    <header className='flex items-center justify-between p-3'>
      <div className='flex items-center gap-2'>
        {/* <h1 className='text-xl'>Editor</h1> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>src</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>parent</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>file.md</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button variant="secondary" size="icon">
          <Pencil2Icon className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className='flex gap-2'>
        {/* <Button variant="secondary">Preview</Button> */}
        <Button variant="default">Save</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Create</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <GlobeIcon className="mr-2 h-4 w-4" />
              <span>Publish</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-400'>
              <TrashIcon className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}