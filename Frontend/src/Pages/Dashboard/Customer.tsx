import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/Store'

const Customer = () => {
    const AllCsutomerState = useSelector((state : RootState) => state.login)
  return (
    <div></div>
  )
}

export default Customer