import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { logout } from "../../Redux/Pages/UserInfo";
import { useNavigate } from "react-router-dom";
import { Chart3 } from "./Charts Part/Chart3";
import { CgMail } from "react-icons/cg";
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { ImUserPlus } from "react-icons/im";
import { TbBrandBooking, TbMenu3 } from "react-icons/tb";
import {  Component } from "./Charts Part/PieChart";
import { BsThreeDots } from "react-icons/bs";
import { getAllRoomsFn } from "../../Redux/Dashboard/Rooms/AllRooms";
import { getAllBookingFn } from "../../Redux/Dashboard/Booking/AllBooking";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import dayjs from "dayjs";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
    dispatch(logout());
  };

  // LLoading For Sample Booking Data 
  const AllBookingState = useSelector((state: RootState) => state.AllBookings);
  const toastId = "userpage";
  useEffect(() => {
    dispatch(getAllBookingFn());
  }, []);

  // Use State Functions Starts Here
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered laptops based on search term by name, price, or core
  const filteredLaptops = AllBookingState?.data?.filter(
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
  return (
    <div>
      <div className="tp-part flex justify-between items-center px-4 mt-3">
        <div className="tp-1">
          <div className="bg-white/30 w-[270px] h-[30px] py-auto rounded p-0.75 flex text-white ">
            <span className="my-auto ml-3 text-white/70">
              {" "}
              <IoMdSearch />
            </span>
            <span className=" ml-2 text-sm text-white/70 my-auto">Search</span>
          </div>
        </div>
        <div className="tp-2 flex justify-center it gap-3">
          <button className="bg-white rounded-full p-2 text-blue-600 text-sm">
            <CgMail />
          </button>
          <button className="bg-white rounded-full p-2 text-blue-600 text-sm">
            <IoNotificationsOutline />
          </button>
          <button
            className="bg-white rounded text-xs font-medium py-2 px-4 text-blue-600"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      </div>
      {/* Chart  */}
      <div className="mt-6 w-[98%] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-7">
        <div className="bg-white rounded-md shadow-md  h-[120px] grid grid-cols-2">
          <div className="tp-1 flex justify-center ml-1 items-center">
            <div>
              <h2 className="text-2xl text-zinc-700 font-extrabold">$42,876</h2>
              <span className="text-xs font-semibold text-zinc-400">
                Total income
              </span>
            </div>
          </div>
          <div className="tp-2 flex items-center bg-zinc-700 rounded-tr-md rounded-br-md justify-center text-white">
            <div className="bg-white text-zinc-700 rounded-tr-md p-4 text-xl rounded-full">
              <span>
                <FaMoneyCheckAlt />
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md grid grid-cols-2  h-[120px]">
          <div className="tp-1 flex justify-center ml-1 items-center">
            <div>
              <h2 className="text-2xl text-indigo-700 font-extrabold">$176</h2>
              <span className="text-xs font-semibold text-indigo-300">
                Total expense
              </span>
            </div>
          </div>
          <div className="tp-2 flex items-center bg-indigo-700 rounded-tr-md rounded-br-md justify-center text-white">
            <div className="bg-white p-4 text-xl rounded-tl-md font-extrabold rounded-full">
              <span className="text-indigo-700">
                <GiExpense />
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md grid grid-cols-2 h-[120px]">
          <div className="tp-1 flex justify-center ml-1 items-center">
            <div>
              <h2 className="text-2xl text-orange-500 font-extrabold">84</h2>
              <span className="text-xs  font-semibold text-orange-300">
                Loaned People
              </span>
            </div>
          </div>
          <div className="tp-2 flex items-center justify-center rounded-tr-md rounded-br-md bg-orange-500 text-white">
            <div className="bg-white p-4 rounded-tr-md rounded-full">
              <span className="text-xl text-orange-500">
                <ImUserPlus />
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md grid grid-cols-2 h-[120px]">
          <div className="tp-1 flex justify-center ml-1 items-center">
            <div>
              <h2 className="text-2xl text-green-500 font-extrabold">{AllBookingState.data.length}</h2>
              <span className="text-xs font-medium text-green-300">
                Booking Data
              </span>
            </div>
          </div>
          <div className="tp-2 flex items-center bg-green-500 rounded-tr-md rounded-br-md justify-center text-white">
            <div className="bg-white p-4 rounded-tl-md rounded-full">
              <span className="text-xl text-green-500">
                <TbBrandBooking />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-2 w-[98%] mx-auto">
        <div className="col-span-2 w-full h-[410px]">
          <Chart3 />
        </div>
        <div className="h-[408px] border p-6 rounded-2xl shadow">
          <Component />
        </div>
      </div>
      {/* Booking Data */}
      <div className="w-[98%] mx-auto border rounded-xl mt-4 h-[25vh] shadow ">
        <h2 className="mt-5 ml-5 font-semibold text-blue-600">Booking - Sample Data</h2>
        <p className="text-sm mt-1 text-gray-500 ml-5">Show sample booking for last two data</p>
        <hr className="mt-3 w-full" />
        <table className="max-h-[500px] w-full overflow-y-auto rounded-lg shadow-sm border border-gray-200">  
          <thead className="text-xs font-normal text-gray-400  bg-white shadow-md rounded-lg">
                <tr className="border-b">
                  <th scope="col" className="px-4 py-4">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-2.5 text-center">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-2.5 text-center">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-2.5 text-center">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-2.5 text-center">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-2.5 text-center">
                    # Days
                  </th>
                  <th scope="col" className="px-6 py-2.5 text-center">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-2.5 text-lg flex items-center justify-center text-blue-500">
                  <span> <BsThreeDots /></span>
                  </th>
                </tr>
              </thead>
                 <tbody className="text-slate-800">
                {filteredLaptops?.map((item, id) => (
                  <tr className="bg-white border-b text-slate-800" key={id}>
                    <td className="w-4 p-4">
                      {item.Bk_Id}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2.5 text-center font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.Cu_Name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2.5 text-center font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.Cu_Phone}
                    </td>
                    <td className="px-6 py-2.5 text-center">
                      {item.Room.R_Type.Rt_Name}
                    </td>
                    <td className="px-6 py-2.5 text-center">{item.Price}</td>
                    <td className="px-6 py-2.5 text-center">{item.B_Days}</td>
                    <td className="px-6 py-2.5 text-center">{item.Total}</td>
                    <td className="flex items-center gap-4 justify-center px-6 py-2.5">
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
  );
};

export default Main;
