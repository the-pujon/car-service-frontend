import { selectCurrentUser,signOut } from '@/redux/features/auth/authSlice'
import { useAppDispatch,useAppSelector } from '@/redux/hook'
import { Home,LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const DashboardHeader: React.FC = () => {
    const dispatch = useAppDispatch()
    const userRole = useAppSelector(selectCurrentUser)?.role

    return (
        <header className="bg-background border-b text-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-xl font-semibold ml-12 md:ml-0">Welcome, {userRole === 'admin' ? 'Admin' : 'User'}</h2>
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
        </header>
    )
}

export default DashboardHeader