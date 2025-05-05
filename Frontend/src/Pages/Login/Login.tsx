import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/Store";
import toast from "react-hot-toast";
import { loginFn, resetLoginState } from "../../Redux/Pages/Login";
import { setUser } from "../../Redux/Pages/UserInfo";
import { getAllUsersFn } from "../../Redux/Dashboard/Users/AllUsers";
import { newUsersFn } from "../../Redux/Dashboard/Users/NewUser";

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
    const {Name , U_Id , Email , Phone , Role} = loginState.data
    dispatch(setUser({Name , Email , U_Id , Role , Phone}))
    toast.success('User Logged Successfully' , { id : toastId})
    navigate('/dashboard')
  }
  if(loginState.IsError){
    toast.error(loginState.E_message , { id : toastId})
    dispatch(resetLoginState())
  }
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
    <div className="flex items-center bg-[#cecece] justify-center h-screen">
      <form className="bg-white w-[30%] h-[50vh] rounded-2xl p-4">
        <h2 className="font-bold text-xl text-left ml-4 text-slate-700 ">
          Sign In
        </h2>
        <p className="text-xs  mt-1 text-gray-400 ml-4">
          Please provide valid user credentails
        </p>
        {/* Email Input */}
        <div className="grid mt-12 ml-4 ">
          <label htmlFor="Email" className="text-xs text-slate-800 font-medium">
            Email
          </label>
          <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
        </div>
        <div className="grid mt-2 ml-4 ">
          <label htmlFor="Email" className="text-xs text-slate-800 font-medium">
            Password
          </label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
        </div>
        <button className="w-[96%] py-2 rounded font-bold hover:scale-95 duration-500 transition-all text-sm ml-4 mt-4 bg-slate-700 text-white" onClick={handleSubmit}>
          Login
        </button>
        <p className="ml-4 mt-12 text-xs">
          If you haven't account sign up in{" "}
          <span
            className="underline text-slate-500"
            onClick={() => navigate("/register")}
          >
            {" "}
            Here!
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
