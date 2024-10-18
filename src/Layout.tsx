import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar.tsx'
import Navbar from './components/Navbar.tsx'

const Layout = () => {
    return (

    <div>
        <Navbar />
        <div className='flex mt-14'>
            <div className='w-1/5'>
                <Sidebar />
            </div>
            <div className='w-4/5'>
                <Outlet />
            </div>
        </div>
    </div>    
    
    )
}

export default Layout