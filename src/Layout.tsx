import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar.tsx'

const Layout = () => {
    return (
        <div className='flex'>
            <div className='w-1/5'>
                <Sidebar />
            </div>
            <div className='w-4/5'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout