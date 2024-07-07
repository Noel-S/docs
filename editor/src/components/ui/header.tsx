import { Button } from './button'
import { CopyIcon, DotsHorizontalIcon, GlobeIcon, Pencil2Icon, PlusIcon, TrashIcon, UploadIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './breadcrumb'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { Input } from './input'
import { Label } from './label'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'
import { Separator } from './separator'

export default function Header() {
  return (
    <header className='flex items-center justify-between p-3'>
      <div className='flex items-center gap-2'>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon">
              <Pencil2Icon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>File details</DialogTitle>              
            </DialogHeader>
            <DialogDescription className='flex flex-col gap-2'>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="parentfolder">Parent folder</Label>
                <div className='flex w-full items-center gap-2'>
                  <Input type="text" id="parentfolder" placeholder="src/content/docs/how-to" disabled />
                  <Button variant="secondary" size="icon">
                    <Pencil2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="filename">File name</Label>
                <div className='flex w-full items-center gap-2'>
                  <Input type="text" id="filename" placeholder="file" defaultValue={'filename'} />
                  <ToggleGroup variant="outline" type="single" defaultValue='md'>
                    <ToggleGroupItem value="md" aria-label="Toggle md">
                      .md
                    </ToggleGroupItem>
                    <ToggleGroupItem value="mdx" aria-label="Toggle mdx">
                      .mdx
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </DialogDescription>
            <Separator />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" variant="default">
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="secondary" size="icon">
          <CopyIcon className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <UploadIcon className="h-4 w-4" />
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
            <Dialog>
              <DialogTrigger className='w-full'>
                <DropdownMenuItem className='text-red-400' onSelect={(e) => e.preventDefault()}>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete this file from the server.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="destructive">
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}