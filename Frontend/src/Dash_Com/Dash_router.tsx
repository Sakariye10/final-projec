import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Dash_router = () => {
  // if(localStorage.getItem)
  return (
    <div className=' w-full  h-screen flex bg-white'>
        <div className='w-[16%] border-r border-gray-100'>
            <Sidebar />
        </div>
        <div className=' w-full'>
            <div className='absolute w-[85%] ml-3'><Outlet /></div>
            <div className="h-[30%] bg-blue-500 w-full"></div>
            <div className="w-[70%] bg-white"></div>
        </div>
    </div>
  )
}

export default Dash_router