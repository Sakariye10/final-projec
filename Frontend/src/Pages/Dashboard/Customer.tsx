import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Redux/Store'
import { getAllCustomersFn } from '../../Redux/Dashboard/Customer/AllCustomer'

const Customer = () => {
    const AllCsutomerState = useSelector((state : RootState) => state.AllCustomer)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
      dispatch(getAllCustomersFn())
    },[])
    const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      {/* Top Part Starts In Here */}
        <div className="flex justify-between px-6 mt-3 items-center">
              <div className="ml-4">
                <h2 className="text-lg font-bold text-white">
                  {" "}
                  All Customer's Data
                </h2>
              </div>
              {/* Dialog Part Starts Here */}
              <div className="flex items-center justify-center mr-1 gap-4">
                <input
                  type="text"
                  className="px-3 py-2 text-blue-500 placeholder:text-blue-200 text-center shadow-md bg-white rounded text-sm"
                  placeholder="Search Here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='bg-white/30 text-white rounded px-4 py-2 text-sm font-semibold '>New Customer</button>
              </div>
            </div>
    </div>
  )
}

export default Customer