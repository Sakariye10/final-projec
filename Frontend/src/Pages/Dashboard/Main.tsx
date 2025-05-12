import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/Store'
import { logout } from '../../Redux/Pages/UserInfo'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const handleLogOut = () => {
    navigate('/')
    dispatch(logout())
  }
  return (
    <div>Main
      <button className='m-3 absolute right-0 bg-white rounded py-2 px-4 text-sm font-medium text-blue-500' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Main