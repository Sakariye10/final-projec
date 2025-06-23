import React from 'react'
import { BiUser } from 'react-icons/bi'
import { BsDashSquareFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { FcDebt } from 'react-icons/fc'
import { GiExpense, GiHelp, GiPayMoney } from 'react-icons/gi'
import { GrOrderedList } from 'react-icons/gr'
import { IoSettings } from 'react-icons/io5'
import { LiaBedSolid } from 'react-icons/lia'
import { MdOutlineDensitySmall, MdRoomService } from 'react-icons/md'
import { RiCustomerServiceFill } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { TbBrandBooking, TbReportMoney } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { FaUserGroup } from "react-icons/fa6"; 

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className=''>
        <h2 className='text-center mt-2 font-semibold text-blue-800 font-serif'>Nugaal Hotel</h2>
        <h3 className='text-sm text-gray-400 font-semibold mt-8 ml-4'>Menu</h3>
        <ul className='mt-5  justify-center grid gap-10'>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-blue-600' onClick={() => navigate('/dashboard')}><span><RxDashboard /></span>  <span>Dashboard</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500' onClick={() => navigate('/dashboard/users')}><span><FaUserGroup /></span>  <span>Users</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500' onClick={() => navigate('/dashboard/floor')}><span><MdOutlineDensitySmall /></span>  <span>Floor</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500' onClick={() => navigate('/dashboard/rooms')}><span><LiaBedSolid /></span>  <span>Rooms</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500' onClick={() => navigate('/dashboard/roomtype')}><span><MdRoomService /></span>  <span>Roomtype</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500' onClick={() => navigate('/dashboard/customer')}><span><RiCustomerServiceFill /></span>  <span>Customer</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500' onClick={() => navigate('/dashboard/booking')}><span><TbBrandBooking /></span>  <span>Booking</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500'><span><FcDebt /></span>  <span>Debts</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500'><span><GiPayMoney /></span>  <span>Payment</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500'><span><GiExpense /></span>  <span>Expense</span> </li>
            <li className='flex gap-4 cursor-pointer items-center text-sm text-gray-500'><span><TbReportMoney /></span>  <span>Reports</span> </li>
        </ul>
        <h3 className='text-sm text-gray-400 font-semibold mt-4 ml-4'>Settings</h3>
        <ul className='mt-5  justify-center grid gap-6 mr-6'>
            <li className='flex gap-4 items-center text-sm text-gray-500'><span className='text-sm'><FaUserAlt /></span>  <span>Profile</span> </li>
        <li className='flex gap-4 items-center text-sm text-gray-500'><span><IoSettings /></span>  <span>Setting</span> </li>
            <li className='flex gap-4 items-center text-sm text-gray-500'><span><GiHelp /></span>  <span>Help</span> </li>
        </ul>
    </div>
  )
}

export default Sidebar