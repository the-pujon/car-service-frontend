import { selectCurrentUser,signOut } from '@/redux/features/auth/authSlice'
import { useAppDispatch,useAppSelector } from '@/redux/hook'
import { Home,LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const DashboardHeader: React.FC = () => {
    const dispatch = useAppDispatch()
    const userRole = useAppSelector(selectCurrentUser)?.role

    return (
        <div>
            <header className="bg-background border-b text-white shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <h2 className="text-xl font-semibold">Welcome, {userRole === 'admin' ? 'Admin' : 'User'}</h2>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="p-1 rounded-full hover:bg-gray-100 hover:text-black transition-all duration-300">
                            <Home className="w-6 h-6" />
                        </Link>
                        <button
                            onClick={() => dispatch(signOut())}
                            className="p-1 rounded-full hover:bg-gray-100 hover:text-black transition-all duration-300">
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default DashboardHeader