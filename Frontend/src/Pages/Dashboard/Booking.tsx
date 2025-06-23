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
} from "../../components/ui/dropdown-menu";
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
import {
  newUsersFn,
  resetUserState,
} from "../../Redux/Dashboard/Users/NewUser";
import { Button } from "../../components/ui/button";
import { TbMenu3 } from "react-icons/tb";
import { getAllBookingFn } from "../../Redux/Dashboard/Booking/AllBooking";
import { getAllRoomsFn } from "../../Redux/Dashboard/Rooms/AllRooms";
import { newBookingFn } from "../../Redux/Dashboard/Booking/NewBooking";
import { getOneRoomFn } from "../../Redux/Dashboard/Rooms/GetOneRoom";

const AllUsers = () => {
  const AllUserState = useSelector((state: RootState) => state.AllBookings);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = "userpage";
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

  //  All Rooms Data Emplained
  const AllRoomsData = useSelector((state: RootState) => state.AllRoom);
  useEffect(() => {
    dispatch(getAllRoomsFn());
  }, []);

  const filteredRoooms = AllRoomsData.data.filter(
    (item) => 
      item.Is_Booked === true
  )

  // New Booking Registration Function Starts In Here
  const newBookingState = useSelector((state: RootState) => state.NewBooking);
  const [Cu_Name, setCu_Name] = useState("");
  const [Cu_Phone, setCu_Phone] = useState("");
  const [R_Id, setR_Id] = useState("");
  const [B_Days, setB_Days] = useState("");
  const [Paid, setPaid] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {};
    dispatch(newBookingFn(data));
  };

  // Loading Room Price
const OneRoomState = useSelector((state: RootState) => state.OneRoom);

useEffect(() => {
  if (R_Id) {
    dispatch(getOneRoomFn(R_Id));
  }
}, [R_Id]); // Dependency should be R_Id (not empty)

const Price = OneRoomState?.data?.R_Type?.Rt_Price
//@ts-ignore
const [Total, setTotal] = useState(0);

  useEffect(() => {
    if (Price && B_Days) {
      setTotal(Price * B_Days);
    }
  }, [Price, B_Days]);




  return (
    <div>
      {/* Top Part */}
      <div className="flex justify-between px-6 mt-3 items-center">
        <div className="ml-4">
          <h2 className="text-lg font-bold text-white"> All Booking Data</h2>
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
                <DialogTitle className="text-blue-500">
                  Adding New Booking
                </DialogTitle>
                <DialogDescription className="text-xs font-medium">
                  Make sure data that you entered in this dialog registration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium">Name</label>{" "}
                  <input
                    type="text"
                    value={Cu_Name}
                    onChange={(e) => setCu_Name(e.target.value)}
                    className='"flex h-10 w-full mt-1 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium">Phone</label>{" "}
                  <input
                    type="text"
                    value={Cu_Phone}
                    onChange={(e) => setCu_Phone(e.target.value)}
                    className='"flex h-10 w-full mt-1 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium">Room Id</label>{" "}
                  <select className='"flex h-10 w-full mt-1 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50'
                  value={R_Id}
                 onChange={(e) => setR_Id(e.target.value)}
                  >
                    <option selected>Choose Room No</option>
                    {filteredRoooms.map((item, idx) => (
                      <option value={item.R_Id}>{item.R_No}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium text-blue-500">
                    Price
                  </label>{" "}
                  <input
                    type="text"
                    value={Price ? Price : 0}
                   readOnly
                    className='"flex h-10 w-full mt-1 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium">
                    Booking Days
                  </label>{" "}
                  <input
                    type="text"
                    value={B_Days}
                    onChange={(e) => setB_Days(e.target.value)}
                    className='"flex h-10 w-full mt-1 text-blue-500 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium text-blue-500">
                    Total
                  </label>{" "}
                  <input
                    type="text"
                    value={Total}
                    readOnly
                    className='"flex h-10 w-full mt-1 text-blue-500 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium">Paid</label>{" "}
                  <input
                    type="text"
                    value={Paid}
                    onChange={(e) => setPaid(e.target.value)}
                    className='"flex h-10 w-full mt-1 text-blue-500 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-sm font-medium text-blue-500 ">
                    Balance
                  </label>{" "}
                  <input
                    type="text"
                    readOnly
                    className='"flex h-10 w-full mt-1 text-blue-500 rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
              </div>
              <button className="w-full bg-blue-500 flex justify-center items-center gap-2 text-sm hover:shadow-lg font-semibold py-3 rounded text-white mt-2">
                Book now
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
                    <td className="px-6 py-4 text-center">
                      {item.Room.R_Type.Rt_Name}
                    </td>
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
