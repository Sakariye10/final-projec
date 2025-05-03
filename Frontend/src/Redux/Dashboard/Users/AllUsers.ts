import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, Err_Message } from "../../../Interfaces";

interface UsersResponse {
  IsSuccess: boolean;
  result: Users[];
}

interface Users {
  U_Id: number;
  Name: string;
  Phone: string;
  Email: string;
  Password: string;
  Role: string;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
}

const initialState = {
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  E_message: "",
  data: [] as Users [],
};

export const getAllUsersFn = createAsyncThunk(
  "Users/All",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<UsersResponse>(`${Url}/user/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || Err_Message);
      return rejectWithValue(Err_Message);
    }
  }
);


export const getAllUsersSlice = createSlice({
    name : 'All Users',
    reducers : {},
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(getAllUsersFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));
        // Fullfilled Case
        builder.addCase(getAllUsersFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))
        // Rejected Case
        builder.addCase(getAllUsersFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})