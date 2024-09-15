import { Logs } from 'lucide-react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from './ui/dropdown-menu'
import { Link } from 'react-router-dom'

const MobileNav = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='outline-none'>
                    <Logs size={50} className=" p-2 text-primary" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className='bg-primary-foreground'>
                    {["Home","Services","About","Reviews"].map((link,index) => (
                        <DropdownMenuItem asChild key={index}>
                            <Link
                                to={link === "Home" ? "/" : link.toLowerCase()}
                                className="p-3 xl:p-4 -tracking-wider hover:text-foreground transition-colors duration-150"
                            >
                                <span>{link}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MobileNav