import { Logs } from 'lucide-react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from './ui/dropdown-menu'

const MobileNav = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='outline-none'>
                    <Logs size={50} className=" p-2 text-primary" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className='bg-primary-foreground'>
                    {['Home','Services','About','Projects','Skills','Contacts','Pages'].map((link,index) => (
                        <DropdownMenuItem className={`p-3 xl:p-4 ${index === 0 ? 'active' : ''}`} key={link}>
                            <a href="#">
                                <span>{link}</span>
                            </a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MobileNav