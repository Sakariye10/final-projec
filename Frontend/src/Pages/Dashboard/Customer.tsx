// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '../../Redux/Store'
// import { getAllCustomersFn } from '../../Redux/Dashboard/Customer/AllCustomer'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
// import { TbMenu3 } from 'react-icons/tb'
// import dayjs from 'dayjs'

// const Customer = () => {
//     const AllCsutomerState = useSelector((state : RootState) => state.AllCustomer)
//     const dispatch = useDispatch<AppDispatch>()
//     useEffect(() => {
//       dispatch(getAllCustomersFn())
//     },[])
//       // Use State Functions Starts Here
//       const [searchTerm, setSearchTerm] = useState("");
    
//       // Filtered laptops based on search term by name, price, or core
//       const filteredUsers = AllCsutomerState?.data?.filter(
//         (item) =>
//           item.Cu_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.Cu_Phone.toString().includes(searchTerm) ||
//           item.Cu_Address.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//   return (
//     <div>
//       {/* Top Part Starts In Here */}
//         <div className="flex justify-between px-6 mt-3 items-center">
//               <div className="ml-4">
//                 <h2 className="text-lg font-bold text-white">
//                   {" "}
//                   All Customer's Data
//                 </h2>
//               </div>
//               {/* Dialog Part Starts Here */}
//               <div className="flex items-center justify-center mr-1 gap-4">
//                 <input
//                   type="text"
//                   className="px-3 py-2 text-blue-500 placeholder:text-blue-200 text-center shadow-md bg-white rounded text-xs"
//                   placeholder="Search Here"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <span className='bg-white/30 text-white rounded px-4 py-2 text-xs font-semibold '>{AllCsutomerState.data.length || 0}</span>
//               </div>
//             </div>
//             {/* Table Part */}
//              <div className=" px-6 mt-6  ">
//         <div className="bg-white h-[88vh] rounded">
//           <div className="w-full mx-auto">
//             <table className="w-full text-xs font-medium text-left rtl:text-right ">
//               <thead className="text-xs text-white  bg-blue-500  rounded-t shadow-md rounded-lg">
//                 <tr>
//                   <th scope="col" className="px-4 py-3">
//                     <div className="flex items-center">
//                       <input
//                         id="checkbox-all-search"
//                         type="checkbox"
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <label className="sr-only">checkbox</label>
//                     </div>
//                   </th>
//                   <th scope="col" className="px-6 py-1 text-left">
//                     Id
//                   </th>
//                   <th scope="col" className="px-6 py-1 text-left">
//                     Name
//                   </th>
//                   <th scope="col" className="px-6 py-1 text-center">
//                     Phone
//                   </th>
//                   <th scope="col" className="px-6 py-1 text-center">
//                     Balance
//                   </th>
//                   <th scope="col" className="px-6 py-1 text-center">
//                   Author_Id
//                   </th>
//                   <th scope="col" className="px-6 py-1 text-center">
//                     Registered
//                   </th>
//                   <th scope="col" className="px-6 py-1 text-center">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers?.map((item, id) => (
//                   <tr
//                     className="border-t text-slate-00 border-gray-100"
//                     key={id}
//                   >
//                     <td className="w-4 p-4">
//                       <div className="flex items-center">
//                         <input
//                           id="checkbox-table-search-1"
//                           type="checkbox"
//                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                         />
//                         <label className="sr-only">checkbox</label>
//                       </div>
//                     </td>
//                     <td
//                       scope="row"
//                       className="px-6 py-4 text-left whitespace-nowrap"
//                     >
//                       {item.Cu_Id}
//                     </td>
//                     <td
//                       scope="row"
//                       className="px-6 py-4 text-left whitespace-nowrap"
//                     >
//                       {item.Cu_Name }
//                     </td>
//                     <td className="px-6 py-4 text-center">{item.Email}</td>
//                     <td className="px-6 py-4 text-center">{item.Phone}</td>
//                     <td className="px-6 py-4 text-center">{item.Role}</td>
//                     <td className="px-6 py-4 text-center">
//                       {dayjs(item.Created_At).format("DD/MM/YYYY")}
//                     </td>
//                     <td className="flex items-center gap-4 justify-center px-6 py-4">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="bg-blue-500 text-white p-1.5 rounded-full font-bold hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600 duration-500 transition-all hover:font-bold">
//                             <TbMenu3 />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="w-30">
//                           <DropdownMenuLabel className="text-center text-blue-500">
//                             More Details
//                           </DropdownMenuLabel>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem>
//                             <span className=" ml-3 font-semibold text-green-500">
//                               Make Admin
//                             </span>
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator className="w-full" />
//                           <DropdownMenuItem>
//                             <span className=" ml-3 font-semibold text-indigo-500">
//                               Edit
//                             </span>
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator className="w-full" />
//                           <DropdownMenuItem>
//                             <span className=" ml-3 font-semibold text-red-500">
//                               Delete
//                             </span>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Customer

import React from 'react'

const Customer = () => {
  return (
    <div>Customer</div>
  )
}

export default Customer