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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { getAllUsersFn } from "../../Redux/Dashboard/Users/AllUsers";
import toast from "react-hot-toast";
import { newUsersFn } from "../../Redux/Dashboard/Users/NewUser";
import { getAllRoomsFn } from "../../Redux/Dashboard/Rooms/AllRooms";
import { getAllRoomTypesFn } from "../../Redux/Dashboard/RoomType/AllRoomType";
import { newRoomTypeFn, resetRoomTypeState } from "../../Redux/Dashboard/RoomType/NewRoomType";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { TbMenu3 } from "react-icons/tb";

const RoomType = () => {
  const AllRoomsData = useSelector((state: RootState) => state.AllRoomTypes);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = 'userpage'
  useEffect(() => {
    dispatch(getAllRoomTypesFn());
  }, []);

  // Use State Functions Starts Here
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered laptops based on search term by name, price, or core
  const filteredLaptops = AllRoomsData?.data?.filter(
    (item) =>
      item.Rt_Id.toString().includes(searchTerm) ||
      item.Rt_Name.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Registration Functions Starts Here
 // Creating New User Functions Startting In here 
 const newRoomTypeState = useSelector((state : RootState) => state.NewRoomType)

 const [Rt_Name , setRt_Name] = useState('')
 const [Rt_Price , setRt_Price] = useState('')
 const [No_Beds , setNo_Beds] = useState('')

 useEffect(() => {
   if(newRoomTypeState.IsLoading){
     toast.loading('Loading..' , { id : toastId})
   }
   if(newRoomTypeState.IsSuccess){
     toast.success('New Type Registered Successfully' , { id : toastId})
      dispatch(getAllRoomTypesFn())
   }
   if(newRoomTypeState.IsError){
     toast.error(newRoomTypeState.E_message , { id : toastId})
   }
   dispatch(resetRoomTypeState())
 },[newRoomTypeState])

 const handleRegisterSubmit = () => {
   const data = {
     Rt_Name,
     Rt_Price,
     No_Beds
   }
   dispatch(newRoomTypeFn(data))
 }



  return (
    <div>
      {/* Top Part */}
      <div className="flex justify-between px-6 mt-3 items-center">
        <div className="ml-4">
          <h2 className="text-lg font-bold text-white">
            {" "}
            All Room Type Data
          </h2>
        </div>
        {/* Dialog Part Starts Here */}
        <div className="flex items-center justify-center mr-1 gap-4">
          <input
            type="text"
            className="px-3 py-2 text-blue-500 placeholder:text-blue-200 text-center shadow-md bg-white rounded text-xs "
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog>
            <DialogTrigger className="bg-white/20 text-white px-4 py-2 text-xs  rounded font-semibold flex items-center gap-2">
              <span className="text-md font-bold">
                <VscGitPullRequestNewChanges />
              </span>{" "}
              New Room Type
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Adding New Room Type</DialogTitle>
                <DialogDescription>
                  Make sure data that you entered in this dialog registration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-xs  font-semibold">Name</label>{" "}
                  <input
                    type="text"
                    value={Rt_Name}
                    onChange={(e) => setRt_Name(e.target.value)}
                    className='"flex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-xs  ring-offset-white file:border-0 file:bg-transparent file:text-xs  file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="Color" className="text-xs  font-semibold">
                    Price
                  </label>{" "}
                  <input
                    type="text"
                    value={Rt_Price}
                    onChange={(e) => setRt_Price(e.target.value)}
                    className='"flex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-xs  ring-offset-white file:border-0 file:bg-transparent file:text-xs  file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="Color" className="text-xs  font-semibold">
                    # Beds
                  </label>{" "}
                  <input
                    type="email"
                    value={No_Beds}
                    onChange={(e) => setNo_Beds(e.target.value)}
                    className='"flex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-xs  ring-offset-white file:border-0 file:bg-transparent file:text-xs  file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
             
              </div>
              <button className="w-full bg-blue-500 text-xs  flex justify-center items-center gap-2 text-md hover:shadow-lg font-semibold py-3 rounded text-white mt-2" onClick={handleRegisterSubmit}>
                <span className=" text-xl">
                  <IoIosAddCircle />
                </span>{" "}
                Add New Type
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Table Part */}
      <div className=" px-6 mt-6  ">
        <div className="bg-white h-[81vh] rounded-2xl">
          <div className=" ">
            <table className="w-full text-xs font-medium text-left rtl:text-right ">
              <thead className="text-xs text-white bg-blue-500 shadow-md rounded-lg">
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
                    Id
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Price / Night
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    No - Beds
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Deleted
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
                      {item.Rt_Id}
                    </td>
                    <td className="px-6 py-4 text-center">{item.Rt_Name}</td>
                    <td className="px-6 py-4 text-center">{item.Rt_Price}$</td>
                    <td className="px-6 py-4 text-center">{item.No_Beds}</td>
                    <td className="flex items-center gap-4 justify-center px-6 py-4">
                        {item.Is_Deleted === false ? (
                          <button className='bg-green-500 py-1 px-4 rounded text-white font-medium'>No</button>
                        ) : (
                          <button className='bg-[#6997FF] py-1 px-4 rounded text-white font-medium'>Yes</button>
                        )}
                      </td>
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
                          <DropdownMenuLabel className="text-center text-blue-500">
                            More Details
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <span className=" ml-3 font-semibold text-orange-500">
                              Preview
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="w-full" />
                          <DropdownMenuItem>
                            <span className=" ml-3 font-semibold text-green-500">
                              Edit
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="w-full" />
                          <DropdownMenuItem>
                            <span className=" ml-3 font-semibold text-red-500">
                              Delete
                            </span>
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
          <p className="text-xs  ml-1 text-gray-400">
            <span className="text-[#1a1a1a] text-xs">
              {filteredLaptops.length}{" "}
            </span>{" "}
            Types Registered
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

export default RoomType;
