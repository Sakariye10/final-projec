import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Dash_router = () => {
  return (
    <div className='w-full h-screen flex bg-white'>
      {/* Sidebar Section with hidden scrollbar */}
      <div className='w-[16%] border-r hidden lg:block border-gray-100 h-screen overflow-y-auto'>
        <Sidebar />
        <style>
          {`
            .sidebar-scroll::-webkit-scrollbar {
              display: none;
            }
            .sidebar-scroll {
              -ms-overflow-style: none;  /* For Internet Explorer 10+ */
              scrollbar-width: none;  /* For Firefox */
            }
          `}
        </style>
      </div>

      {/* Main Content Section */}
      <div className='w-full'>
        <div className='absolute w-[85%] ml-3'>
          <Outlet />
        </div>

        {/* Optional header */}
        <div className="h-[25%] bg-blue-500 w-full"></div>

        {/* Main content background */}
        <div className="w-[75%] bg-white"></div>
      </div>
    </div>
  )
}

export default Dash_router
