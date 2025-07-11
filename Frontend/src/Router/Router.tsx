import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Dash_router from '../Dash_Com/Dash_router'
import Main from '../Pages/Dashboard/Main'
import Rooms from '../Pages/Dashboard/Rooms'
import AllUsers from '../Pages/Dashboard/Users'
import RoomTyepe from '../Pages/Dashboard/RoomType'
import FloorPage from '../Pages/Dashboard/FloorPage'
import Booking from '../Pages/Dashboard/Booking'
import Customer from '../Pages/Dashboard/Customer'
import Debts from '../Pages/Dashboard/Debts'
import Payment from '../Pages/Dashboard/Payment'
import Reports from '../Pages/Dashboard/Reports'
import Expense from '../Pages/Dashboard/Expense'

const Router = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default Router



export const router = createBrowserRouter([
    {
        path : '/',
        element : <Router/>,
        children : [
            {
                index : true,
                element : <Login />
            },
            {
                path : 'register',
                element : <Register />
            },
            {
                path : '*',
                element : <h2>Not Found</h2>
            }
        ]
    },
    {
        path : '/dashboard',
        element : <Dash_router />,
        children : [
            {
                index : true,
                element : <Main />
            },
            {
                path : 'rooms',
                element : <Rooms />
            },
            {
                path : 'users',
                element : <AllUsers />
            },
            {
                path : 'roomtype',
                element : <RoomTyepe/>
            },
            {
                path : 'floor',
                element : <FloorPage />
            },
            {
                path : 'booking',
                element : <Booking />
            },
            {
                path : 'customer',
                element : <Customer />
            },
            {
                path : 'debts',
                element : <Debts />
            },
            {
                path : 'payment',
                element : <Payment />
            },
            {
                path : 'reports',
                element : <Reports />
            },
            {
                path : 'expense',
                element : <Expense />
            }
        ]
    }
])