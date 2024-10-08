import { selectCurrentUser,signOut } from '@/redux/features/auth/authSlice'
import { useAppDispatch,useAppSelector } from '@/redux/hook'
import { Home,LogOut,Menu,X } from 'lucide-react'
import React,{ useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetUserBookingsQuery } from '@/redux/features/bookings/bookingApi'
import { ServiceSlotCountdown } from '@/components/Dashboard/ServiceSlotCountdown'

interface Booking {
    _id: string;
    service: {
        name: string;
        price: number;
    };
    slot: {
        date: string;
        startTime: string;
    };
}

const DashboardHeader: React.FC = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentUser)
    const userRole = user?.role
    const { data,refetch } = useGetUserBookingsQuery(undefined,{
        skip: userRole !== 'user'
    })
    const [nextBooking,setNextBooking] = useState<Booking | null>(null)
    const [isMenuOpen,setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (userRole !== 'user') return;

        const updateNextBooking = () => {
            if (data?.data) {
                const now = new Date()
                const upcoming = data.data.filter((booking: Booking) => {
                    const bookingDate = new Date(`${booking.slot.date} ${booking.slot.startTime}`)
                    return bookingDate > now
                })

                const sortedUpcoming = [...upcoming].sort((a,b) => {
                    const dateA = new Date(`${a.slot.date} ${a.slot.startTime}`)
                    const dateB = new Date(`${b.slot.date} ${b.slot.startTime}`)
                    return dateA.getTime() - dateB.getTime()
                })

                setNextBooking(sortedUpcoming[0] || null)
            }
        }

        updateNextBooking()
        const interval = setInterval(() => {
            updateNextBooking()
            refetch()
        },60000) // Update every minute

        return () => clearInterval(interval)
    },[data,refetch,userRole])

    return (
        <header className="bg-background border-b text-white shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <h2 className="text-xl font-semibold ml-12 md:ml-0">Welcome, {userRole === 'admin' ? 'Admin' : user?.name || 'User'}</h2>
                    <button
                        className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-all duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {
                            isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />
                        }
                    </button>
                </div>

                <div className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
                    {userRole === 'user' && nextBooking && (
                        <div className="flex flex-col md:flex-row items-center space-x-2 text-center md:text-left">
                            <span className="text-sm font-semibold">Next: {nextBooking.service.name}</span>
                            <ServiceSlotCountdown date={nextBooking.slot.date} time={nextBooking.slot.startTime} />
                        </div>
                    )}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="p-2 rounded-full hover:bg-gray-700 transition-all duration-300">
                            <Home className="w-5 h-5" />
                        </Link>
                        <button
                            onClick={() => dispatch(signOut())}
                            className="p-2 rounded-full hover:bg-gray-700 transition-all duration-300">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader