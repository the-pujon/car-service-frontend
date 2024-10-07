import DashboardHeader from '@/components/layout/DashboardHeader'
import { Sidebar } from '@/components/layout/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-background">
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout