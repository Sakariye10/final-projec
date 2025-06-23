import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, Err_Message } from "../../../Interfaces";

interface oneRoomResponse {
  IsSuccess : boolean
  result : One_Room
}

const initialState = {
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  E_message: "",
  data: {} as One_Room ,
};

interface One_Room {
  R_Id: number;
  R_No: string;
  Rt_Id: number;
  F_Id: number;
  Is_Booked: boolean;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
  R_Type: {
    Rt_Id: number;
    Rt_Name: string;
    Rt_Price: string;
    No_Beds: string;
    Is_Deleted: boolean;
    Created_At: string;
    Updated_At: string;
  };
}

export const getOneRoomFn = createAsyncThunk(
  "Get One Room",
  async (R_Id: any, { rejectWithValue }) => {
    try {
      const res = await axios.get<oneRoomResponse>(`${Url}/rooms/one/${R_Id}`);
      return res.data.result
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || Err_Message);
      return rejectWithValue(Err_Message);
    }
  }
);

export const getOneRoomSlice = createSlice({
  name: "Get One Room",
  reducers: {},
  initialState,
  extraReducers(builder) {
    // Pending Case
    builder.addCase(getOneRoomFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }));
    // Fullfilled Case
    builder.addCase(getOneRoomFn.fulfilled, (_, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }));
    // Rejected case
    builder.addCase(getOneRoomFn.rejected, (_, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }));
  },
});
