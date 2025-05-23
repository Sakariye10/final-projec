import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : {
      Id: "",
      Name: "",
      Email: "",
      Phone: "",
      Role: "",
      token: "",
    };

const userInfoSlice = createSlice({
  name: "userInfo",
  reducers: {
    setUser: (state, action) => {
      state.Id = action.payload.Id;
      state.Name = action.payload.Name;
      state.Phone = action.payload.Phone;
      (state.Email = action.payload.Email), 
      (state.Role = action.payload.Role);
      state.token = action.payload.token;

      localStorage.setItem("userInfo", JSON.stringify(state));
    },

    logout: (state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("user");
      state.Id = "";
      state.Name = "";
      state.Email = "";
      state.Phone = "";
      state.Role = "";
      state.token = "";
    },
  },
  initialState,
});

export default userInfoSlice;
export const { setUser, logout } = userInfoSlice.actions;
