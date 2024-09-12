import { BellIcon,UserCircleIcon } from 'lucide-react'
import React from 'react'

const DashboardHeader: React.FC = () => {
    return (
        <div>
            <header className="bg-background border-b text-white shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <h2 className="text-xl font-semibold">Welcome, Admin</h2>
                    <div className="flex items-center space-x-4">
                        <button className="p-1 rounded-full hover:bg-gray-100 hover:text-black transition-all duration-300">
                            <BellIcon className="w-6 h-6" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100 hover:text-black transition-all duration-300">
                            <UserCircleIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default DashboardHeader