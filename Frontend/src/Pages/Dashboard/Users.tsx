import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
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
import {
  newUsersFn,
  resetUserState,
} from "../../Redux/Dashboard/Users/NewUser";
import { MdDeleteOutline } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { TbMenu3 } from "react-icons/tb";

const AllUsers = () => {
  const AllUserState = useSelector((state: RootState) => state.AllUsers);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = "userpage";
  useEffect(() => {
    dispatch(getAllUsersFn());
  }, []);

  // Use State Functions Starts Here
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered laptops based on search term by name, price, or core
  const filteredUsers = AllUserState?.data?.filter(
    (item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Email.toString().includes(searchTerm) ||
      item.Role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Phone.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Registration Functions Starts Here
  // Creating New User Functions Startting In here
  const newUserState = useSelector((state: RootState) => state.NewUser);

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (newUserState.IsLoading) {
      toast.loading("Loading..", { id: toastId });
    }
    if (newUserState.IsSuccess) {
      toast.success("New User Registered Successfully", { id: toastId });
      dispatch(getAllUsersFn());
    }
    if (newUserState.IsError) {
      toast.error(newUserState.E_message, { id: toastId });
    }
    dispatch(resetUserState());
  }, [newUserState]);

  const handleRegisterSubmit = () => {
    const data = {
      Name,
      Phone,
      Email,
      Password,
    };
    dispatch(newUsersFn(data));
  };

  return (
    <div>
      {/* Top Part */}
      <div className="flex justify-between px-6 mt-3 items-center">
        <div className="ml-4">
          <h2 className="text-md font-serif font-bold text-white"> All Users Data</h2>
        </div>
        {/* Dialog Part Starts Here */}
        <div className="flex items-center justify-center mr-1 gap-4">
          <input
            type="text"
            className="px-3 py-2 text-blue-500 placeholder:text-gray-200 placeholder:text-xs text-center shadow-md bg-white rounded text-xs"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog>
            <DialogTrigger className="bg-white/20 text-white duration-500 transition-all text-xs px-4 py-2  rounded font-medium flex items-center gap-2">
              <span className="text-md font-bold">
                <VscGitPullRequestNewChanges />
              </span>{" "}
              New User
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-md font-serif font-semibold">Adding New User</DialogTitle>
                <DialogDescription className="text-xs font-medium text-gray-300">
                  Make sure data that you entered in this dialog registration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  {" "}
                  <label className="text-xs font-semibold">Name</label>{" "}
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className='"flex h-10 mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="Color" className="text-xs font-semibold">
                    Phone
                  </label>{" "}
                  <input
                    type="text"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='"flex h-10 mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="Color" className="text-xs font-semibold">
                    Email
                  </label>{" "}
                  <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='"flex h-10 mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="Color" className="text-xs font-semibold">
                    Password
                  </label>{" "}
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='"flex h-10 mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
              </div>
              <button
                className="w-full bg-blue-500 flex justify-center items-center gap-2 text-xs hover:shadow-lg font-semibold py-3 rounded text-white mt-2"
                onClick={handleRegisterSubmit}
              >
                <span className=" text-lg">
                  <IoIosAddCircle />
                </span>{" "}
                Add User
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Table Part */}
      <div className=" px-6 mt-6  ">
        <div className="bg-white h-[88vh] rounded">
          <div className="w-full mx-auto">
            <table className="w-full text-xs font-medium text-left rtl:text-right ">
              <thead className="text-xs text-white  bg-blue-500  rounded-t shadow-md rounded-lg">
                <tr>
                  <th scope="col" className="px-4 py-3">
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
                  <th scope="col" className="px-6 py-1 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-1 text-center">
                    Role
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
                {filteredUsers?.map((item, id) => (
                  <tr
                    className="border-t text-slate-00 border-gray-100"
                    key={id}
                  >
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
                      className="px-6 py-4 text-left whitespace-nowrap"
                    >
                      {item.U_Id}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-left whitespace-nowrap"
                    >
                      {item.Name}
                    </td>
                    <td className="px-6 py-4 text-center">{item.Email}</td>
                    <td className="px-6 py-4 text-center">{item.Phone}</td>
                    <td className="px-6 py-4 text-center">{item.Role}</td>
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
                            <span className=" ml-3 font-semibold text-green-500">
                              Make Admin
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="w-full" />
                          <DropdownMenuItem>
                            <span className=" ml-3 font-semibold text-indigo-500">
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
    </div>
  );
};

export default AllUsers;
