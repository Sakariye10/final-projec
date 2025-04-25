import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Dash_router = () => {
  return (
    <div className=' w-full  h-screen flex bg-gray-100'>
        <div className='w-[16%] border-r border-gray-200'>
            <Sidebar />
        </div>
        <div className='bg-white w-full m-2 rounded-xl'>
            <Outlet />
        </div>
    </div>
  )
}

export default Dash_router