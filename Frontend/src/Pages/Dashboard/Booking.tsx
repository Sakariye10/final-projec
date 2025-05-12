import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { RiEditCircleFill } from "react-icons/ri";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import dayjs from "dayjs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { getAllUsersFn } from "../../Redux/Dashboard/Users/AllUsers";
import toast from "react-hot-toast";
import { newUsersFn, resetUserState } from "../../Redux/Dashboard/Users/NewUser";
import { Button } from "../../components/ui/button";
import { TbMenu3 } from "react-icons/tb";
import { getAllBookingFn } from "../../Redux/Dashboard/Booking/AllBooking";

const AllUsers = () => {
  const AllUserState = useSelector((state: RootState) => state.AllBookings);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = 'userpage'
  useEffect(() => {
    dispatch(getAllBookingFn());
  }, []);

  // Use State Functions Starts Here
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered laptops based on search term by name, price, or core
  const filteredLaptops = AllUserState?.data?.filter(
    (item) =>
      item.Cu_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Cu_Name.toString().includes(searchTerm) ||
      item.R_Id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Registration Functions Starts Here
 // Creating New User Functions Startting In here 
 const newUserState = useSelector((state : RootState) => state.NewUser)

 const [Name , setName] = useState('')
 const [Phone , setPhone] = useState('')
 const [Email , setEmail] = useState('')
 const [Password  , setPassword] = useState('')

 useEffect(() => {
   if(newUserState.IsLoading){
     toast.loading('Loading..' , { id : toastId})
   }
   if(newUserState.IsSuccess){
     toast.success('New User Registered Successfully' , { id : toastId})
      dispatch(getAllUsersFn())
   }
   if(newUserState.IsError){
     toast.error(newUserState.E_message , { id : toastId})
   }
   dispatch(resetUserState())
 },[newUserState])

 const handleRegisterSubmit = () => {
   const data = {
     Name,
     Phone,
     Email,
     Password 
   }
   dispatch(newUsersFn(data))
 }



  return (
    <div>
      {/* Top Part */}
      <div className="flex justify-between px-6 mt-3 items-center">
        <div className="ml-4">
          <h2 className="text-lg font-bold text-white">
            {" "}
            All Booking Data
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
          <Dialog>
            <DialogTrigger className="bg-white/20 text-white px-6 text-sm py-2 rounded font-medium flex items-center gap-2">
              <span className="text-md font-bold">
                <VscGitPullRequestNewChanges />
              </span>{" "}
              New Booking
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Adding New Booking</DialogTitle>
                <DialogDescription>
                  Make sure data that you entered in this dialog registration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-semibold">Name</label>{" "}
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className='"flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="Color" className="text-sm font-semibold">
                    Phone
                  </label>{" "}
                  <input
                    type="text"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='"flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="Color" className="text-sm font-semibold">
                    Email
                  </label>{" "}
                  <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='"flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="Color" className="text-sm font-semibold">
                    Password
                  </label>{" "}
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='"flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
              </div>
              <button className="w-full bg-indigo-500 flex justify-center items-center gap-2 text-md hover:shadow-lg font-semibold py-3 rounded-md text-white mt-2" onClick={handleRegisterSubmit}>
                <span className=" text-xl">
                  <IoIosAddCircle />
                </span>{" "}
                Register User
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Table Part */}
      <div className=" px-6 mt-6  ">
        <div className="bg-white h-[81vh] rounded-2xl">
          <div className=" mx-auto">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs text-white  bg-blue-500 shadow-md rounded-lg">
                <tr>
                  <th scope="col" className="px-4 py-2.5">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-1 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-1 text-left">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    No
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Type 
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Price 
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    R * Days 
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Total 
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Paid 
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Balance 
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Registered
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLaptops?.map((item, id) => (
                  <tr className="bg-white border-b" key={id}>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.Cu_Name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.Cu_Phone}
                    </td>
                    <td className="px-6 py-4 text-center">{item.Room.R_No}</td>
                    <td className="px-6 py-4 text-center">{item.Room.R_Type.Rt_Name}</td>
                    <td className="px-6 py-4 text-center">{item.Price}</td>
                    <td className="px-6 py-4 text-center">{item.B_Days}</td>
                    <td className="px-6 py-4 text-center">{item.Total}</td>
                    <td className="px-6 py-4 text-center">{item.Paid}</td>
                    <td className="px-6 py-4 text-center">{item.Balance}</td>
                    <td className="px-6 py-4 text-center">
                      {dayjs(item.Created_At).format("DD/MM/YYYY")}
                    </td>
                    <td className="flex items-center gap-4 justify-center px-6 py-4">
                    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-blue-500 text-white p-1.5 rounded-full font-bold hover:bg-white hover:border hover:border-indigo-600 hover:text-indigo-600 duration-500 transition-all hover:font-bold">
      <TbMenu3 />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuLabel className="text-center text-blue-500">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
         <span className=" ml-3 font-semibold text-green-500">Edit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem>
         <span className=" ml-3 font-semibold text-red-500">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination Part */}
      <div className="flex justify-between items-center px-6 mt-4">
        <div>
          <p className="text-sm ml-1 text-gray-400">
            <span className="text-[#1a1a1a] text-xs">
              {filteredLaptops.length}{" "}
            </span>{" "}
            Booking Registered
          </p>
        </div>
        <div className=" flex items-center gap-2 mr-1">
          <button
            onClick={() => {}}
            className="py-2 px-4 flex items-center gap-2 bg-blue-500 text-white rounded text-md"
          >
            <FaTrashAlt /> <span className="font-semibold">Trash</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
