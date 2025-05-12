import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/Store";
import toast from "react-hot-toast";
import { loginFn, resetLoginState } from "../../Redux/Pages/Login";
import { setUser } from "../../Redux/Pages/UserInfo";
import { getAllUsersFn } from "../../Redux/Dashboard/Users/AllUsers";
import { newUsersFn } from "../../Redux/Dashboard/Users/NewUser";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const toastId = "Loginpage";

  useEffect(() => {
   if(loginState.IsLoading)
    toast.loading('Loading...' , {id : toastId})
  if(loginState.IsSuccess){
    //@ts-ignore
    const { Name , Id , Email , Phone , token} = loginState?.data
    dispatch(setUser({Name , Email , Id , token , Phone}))
    toast.success('User Logged Successfully' , { id : toastId})
    navigate('/dashboard')
  }
  if(loginState.IsError){
    toast.error(loginState.E_message , { id : toastId})
  }
  dispatch(resetLoginState())
  }, [loginState]);

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault()
    const data = {
      Email,
      Password,
    };
    dispatch(loginFn(data))
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-left space-y-4 pt-16 w-[55%]">
          <h1 className="font-bold text-xl text-slate-600">Welcome Back!</h1>
          <p className="text-xs text-[#7e8ca0]">
            Log in or Create account to get back your dashboard.
          </p>
        </div>
        <div className="flex items-center justify-center mt-8 w-full">
          {/* Google and Facebook  */}
          <div className="w-[55%] grid grid-cols-2 gap-6 ">
            <button className="bg-gray-50 border border-gray-50 py-2 px-6 font-medium flex justify-center items-center gap-4">
              {" "}
              <FcGoogle /> Google
            </button>
            <button className="bg-gray-50 border border-gray-50 py-2 px-6 font-medium flex justify-center items-center gap-4">
              {" "}
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
          {/* Inputs Starts In Here  */}
          <div className="w-[55%] mt-6 flex flex-col ">
          <label className="text-sm  text-left space-y-4 font-medium text-slate-600"> Email</label>
          <input type="text" id="first_name" className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required value={Email} onChange={(e) => setEmail(e.target.value)} />
          <label className="text-sm  text-left space-y-4 font-medium text-slate-600 mt-3"> Password</label>
          <input type="password" id="first_name" className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password" required value={Password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full  mt-6 bg-blue-600 text-white hover:bg-blue-700 duration-500 py-2.5 rounded font-sans font-semibold" onClick={handleSubmit}>Login</button>
          </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <img
          src="./images/logo/logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Login;
