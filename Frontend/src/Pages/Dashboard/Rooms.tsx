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
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { getAllRoomTypesFn } from "../../Redux/Dashboard/RoomType/AllRoomType";
 
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const AllRooms = () => {
  const AllRoomsData = useSelector((state: RootState) => state.AllRoom);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = 'userpage'
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  useEffect(() => {
    dispatch(getAllRoomsFn());
  }, []);

  // Use State Functions Starts Here
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered laptops based on search term by name, price, or core
  const filteredLaptops = AllRoomsData?.data?.filter(
    (item) =>
      item.R_No.toString().includes(searchTerm) ||
      item.R_Type.Rt_Name.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Registration Functions Starts Here
 // Creating New User Functions Startting In here 
 const newUserState = useSelector((state : RootState) => state.NewUser)

 const [R_No , setR_No] = useState('')
 const [Rt_Id , setRt_Id] = useState('')
 const [F_Id , setF_Id] = useState('')

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
 },[newUserState])

 const handleRegisterSubmit = () => {
   const data = {
    Rt_Id,
    F_Id,
    R_No
   }
   dispatch(newR(data))
 }


//  Room Type Dispatch Endpoints Starts  In Here 

    const AllRoomTypesData = useSelector((state: RootState) => state.AllRoomTypes);
  useEffect(() => {
   dispatch(getAllRoomTypesFn())
  },[])

  return (
    <div>
      {/* Top Part */}
      <div className="flex justify-between px-6 mt-3 items-center">
        <div className="ml-4">
          <h2 className="text-lg font-bold text-white">
            {" "}
            All Rooms Data
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
            <DialogTrigger className="bg-white/20 text-white px-4 py-2 text-sm rounded font-medium flex items-center gap-2">
              <span className="text-md font-bold">
                <VscGitPullRequestNewChanges />
              </span>{" "}
              New Room
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Adding New Room</DialogTitle>
                <DialogDescription>
                  Make sure data that you entered in this dialog registration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-semibold">No</label>{" "}
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className='"flex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="Color" className="text-sm font-semibold">
                    # Floor
                  </label>{" "}
                  <input
                    type="text"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='flex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="Color" className="text-sm font-semibold">
                    Roomtype
                  </label>{" "}
                  <select className="lex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {AllRoomTypesData.data.map((item , idx) => (
                      <option value={item.Rt_Id} key={idx}>{item.Rt_Name}</option>
                    ))}
                  </select>
                </div>
             
              </div>
              <button className="w-full bg-indigo-500 flex justify-center items-center gap-2 text-md hover:shadow-lg font-semibold py-3 rounded-md text-white mt-2" onClick={handleRegisterSubmit}>
                <span className=" text-xl">
                  <IoIosAddCircle />
                </span>{" "}
                Add Room
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Table Part */}
      <div className=" px-6 mt-6  ">
        <div className="bg-white h-[81vh] rounded-2xl">
          <div className="">
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
                    No
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Price / Night
                  </th>
                  <th scope="col" className="px-6 py-1 text-left">
                    Floor
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    No - Beds
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Is Booked
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
                      {item.R_No}
                    </td>
                    <td className="px-6 py-4 text-center">{item.R_Type.Rt_Name}</td>
                    <td className="px-6 py-4 text-center">{item.R_Type.Rt_Price}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.F_Id}
                    </td>
                    <td className="px-6 py-4 text-center">{item.R_Type.No_Beds}</td>
                    <td className="flex items-center gap-4 justify-center px-6 py-4">
                        {item.Is_Booked === false ? (
                          <button className='bg-green-500 py-1 px-4 rounded text-white font-medium'>Available</button>
                        ) : (
                          <button className='bg-blue-500 py-1 px-6 rounded text-white font-medium'>Booked</button>
                        )}
                      </td>
                    <td className="px-6 py-4 text-center">
                      {dayjs(item.Created_At).format("DD/MM/YYYY")}
                    </td>
                    <td className="flex items-center gap-4 justify-center px-6 py-4">
                      <span className="text-2xl text-blue-500">
                        <RiEditCircleFill />
                      </span>
                      <span className="text-2xl text-red-500">
                        <IoIosRemoveCircle />
                      </span>
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
            Rooms Registered
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

export default AllRooms;
