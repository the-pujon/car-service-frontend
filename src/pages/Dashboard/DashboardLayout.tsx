import DashboardHeader from '@/components/layout/DashboardHeader'
import { Sidebar } from '@/components/layout/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <>
            <div className="flex h-screen bg-background">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <DashboardHeader />
                    {/*<main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>*/}
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DashboardLayout