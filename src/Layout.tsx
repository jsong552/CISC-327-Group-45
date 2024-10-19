import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar.tsx'
import Navbar from './components/Navbar.tsx'   

const Layout = () => {
    return (


        <div>
            <div className='flex'>
                <Navbar/>
            </div>
            <div className='flex'>
            <div className='w-1/5'>
                <Sidebar />
            </div>
            <div className='w-4/5 mt-10'>
                <Outlet />
            </div>
        </div>

        </div>
        
    )
}

export default Layout