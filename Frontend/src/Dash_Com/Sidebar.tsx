import React from 'react'
import { BiUser } from 'react-icons/bi'
import { BsDashSquareFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { FcDebt } from 'react-icons/fc'
import { GiExpense, GiHelp, GiPayMoney } from 'react-icons/gi'
import { GrOrderedList } from 'react-icons/gr'
import { IoSettings } from 'react-icons/io5'
import { LiaBedSolid } from 'react-icons/lia'
import { MdRoomService } from 'react-icons/md'
import { RiCustomerServiceFill } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { TbBrandBooking, TbReportMoney } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { FaUserGroup } from "react-icons/fa6"; 

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className=''>
        <h2 className='text-center mt-2 font-semibold text-indigo-900 font-serif'>Maareeye Hotel</h2>
        <h3 className='text-sm text-gray-400 mt-8 ml-4'>Menu</h3>
        <ul className='mt-5  justify-center grid gap-8'>
            <li className='flex gap-4 items-center text-sm text-indigo-500' onClick={() => navigate('/dashboard')}><span><RxDashboard /></span>  <span>Dashboard</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900' onClick={() => navigate('/dashboard/rooms')}><span><LiaBedSolid /></span>  <span>Rooms</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900' onClick={() => navigate('/dashboard/users')}><span><FaUserGroup /></span>  <span>Users</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><MdRoomService /></span>  <span>Roomtype</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><RiCustomerServiceFill /></span>  <span>Customer</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><GrOrderedList /></span>  <span>Order</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><TbBrandBooking /></span>  <span>Booking</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><FcDebt /></span>  <span>Debts</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><GiPayMoney /></span>  <span>Payment</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><GiExpense /></span>  <span>Expense</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><TbReportMoney /></span>  <span>Reports</span> </li>
        </ul>
        <h3 className='text-sm text-gray-400 mt-4 ml-4'>Settings</h3>
        <ul className='mt-5  justify-center grid gap-6 mr-6'>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span className='text-sm'><FaUserAlt /></span>  <span>Profile</span> </li>
        <li className='flex gap-4 items-center text-sm text-indigo-900'><span><IoSettings /></span>  <span>Setting</span> </li>
            <li className='flex gap-4 items-center text-sm text-indigo-900'><span><GiHelp /></span>  <span>Help</span> </li>
        </ul>
    </div>
  )
}

export default Sidebar