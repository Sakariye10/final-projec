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
import { getAllRoomsFn } from "../../Redux/Dashboard/Rooms/AllRooms";
import { newRoomFn, resetRoomState } from "../../Redux/Dashboard/Rooms/NewRoom";
import { getAllRoomTypesFn } from "../../Redux/Dashboard/RoomType/AllRoomType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { TbMenu3 } from "react-icons/tb";
import { HiOutlineAdjustments } from "react-icons/hi";

const AllRooms = () => {
  const AllRoomsData = useSelector((state: RootState) => state.AllRoom);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = "roompage";
  useEffect(() => {
    dispatch(getAllRoomsFn());
  }, []);

  // Use State Functions Starts Here
  const [searchTerm, setSearchTerm] = useState("");


    const AllRoomTypesData = useSelector(
    (state: RootState) => state.AllRoomTypes
  );
  useEffect(() => {
    dispatch(getAllRoomTypesFn());
  }, []);

  const [filterStatus, setFilterStatus] = useState<
    "all" | "available" | "booked"
  >("all");

  const filteredLaptops = AllRoomsData?.data
    ?.filter(
      (item) =>
        item.R_No.toString().includes(searchTerm) ||
        item.R_Type.Rt_Name.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    ?.filter((item) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "available") return item.Is_Booked === false;
      if (filterStatus === "booked") return item.Is_Booked === true;
    });

  // Registration Functions Starts Here
  const [R_No, setR_No] = useState("");
  const [Rt_Id, setRt_Id] = useState(Number);
  const [F_Id, setF_Id] = useState(Number);
  // Creating New User Functions Startting In here
  const NewRoomState = useSelector((state: RootState) => state.NewRoom);

  useEffect(() => {
    if (NewRoomState.IsLoading) {
      toast.loading("Loading..", { id: toastId });
    }
    if (NewRoomState.IsSuccess) {
      toast.success("New Room Registered", { id: toastId });
      dispatch(getAllRoomsFn());
    }
    if (NewRoomState.IsError) {
      toast.error(NewRoomState.E_message, { id: toastId });
    }
    dispatch(resetRoomState())
  }, [NewRoomState]);

  const handleRegisterSubmit = (e : React.FormEvent) => {
    e.preventDefault()
    const data = {
      Rt_Id,
      F_Id,
      R_No,
    };
    dispatch(newRoomFn(data));
  };

  //  Room Type Dispatch Endpoints Starts  In Here



  return (
    <div>
      {/* Top Part */}
      <div className="flex justify-between px-6 mt-3 items-center">
        <div className="ml-4">
          <h2 className="text-lg font-bold text-white"> All Rooms Data</h2>
        </div>
        {/* Dialog Part Starts Here */}
        <div className="flex items-center justify-center mr-1 gap-4">
          <input
            type="text"
            className="px-3 py-2 text-blue-500 placeholder:text-blue-200 text-center shadow-md bg-white rounded text-xs"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog>
            <DialogTrigger className="bg-white/20 text-white px-4 py-2 text-xs rounded font-medium flex items-center gap-2">
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
                  <label className="text-xs font-semibold">No</label>{" "}
                  <input
                    type="text"
                    value={R_No}
                    onChange={(e) => setR_No(e.target.value)}
                    className='"flex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="Color" className="text-xs font-semibold">
                    # Floor
                  </label>{" "}
                  <input
                    type="text"
                    value={F_Id}
                    onChange={(e) => setF_Id(Number(e.target.value))}
                    className="flex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="Color" className="text-xs font-semibold">
                    Roomtype
                  </label>{" "}
                  <select
                  value={Rt_Id}
                  onChange={(e) => setRt_Id(Number(e.target.value))}
                  className="lex h-10 w-full rounded mt-1 border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option selected> Choose Room Type</option>
                    {AllRoomTypesData.data.map((item, idx) => (
                      <option value={item.Rt_Id} key={idx}>
                        {item.Rt_Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="w-full bg-blue-600 flex justify-center items-center gap-2 text-sm hover:shadow-lg font-semibold py-3 rounded text-white mt-2"
                onClick={handleRegisterSubmit}
              >
                Add Room
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-white text-blue-600 py-2 px-4  font-medium flex justify-center gap-2 mr-6 rounded text-xs items-center">
              <HiOutlineAdjustments />
              Filter
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuLabel className="text-center text-blue-500">
              More Details
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>
            <span className=" ml-3 font-semibold" >All</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="w-full" />
            <DropdownMenuItem onClick={() => setFilterStatus("available")}>
             <span className=" ml-3 font-semibold text-green-500" >Available</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="w-full" />
            <DropdownMenuItem onClick={() => setFilterStatus("booked")}>
              <span className=" ml-3 font-semibold text-blue-600" >Booked</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table Part */}
      <div className=" px-6 mt-6  ">
        <div className="bg-white  rounded-2xl">
          <div className="">
            <table className="w-full text-xs text-left rtl:text-right ">
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
                    <td className="px-6 py-4 text-center">
                      {item.R_Type.Rt_Name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.R_Type.Rt_Price}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.F_Id}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.R_Type.No_Beds}
                    </td>
                    <td className="flex items-center gap-4 justify-center px-6 py-4">
                      {item.Is_Booked === false ? (
                        <button className="bg-green-500 py-1 px-4 rounded text-white font-medium">
                          Available
                        </button>
                      ) : (
                        <button className="bg-blue-500 py-1 px-6 rounded text-white font-medium">
                          Booked
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {dayjs(item.Created_At).format("DD/MM/YYYY")}
                    </td>
                    <td className="flex items-center gap-4 justify-center px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="bg-blue-500 text-white p-1.5 rounded-full font-bold hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600 duration-500 transition-all hover:font-bold">
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
    </div>
  );
};

export default AllRooms;
