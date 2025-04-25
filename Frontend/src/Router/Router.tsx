import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Dash_router from '../Dash_Com/Dash_router'
import Main from '../Pages/Dashboard/Main'
import Rooms from '../Pages/Dashboard/Rooms'

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
            }
        ]
    }
])