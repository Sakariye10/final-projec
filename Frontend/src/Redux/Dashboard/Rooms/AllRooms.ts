import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, Err_Message } from "../../../Interfaces";

interface roomsResponse {
  IsSuccess: boolean;
  result: RoomData[];
}

interface RoomData {
  R_Id: string;
  R_No: string;
  Rt_Id: number;
  F_Id: string;
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

const initialState = {
  IsLoadidng: false,
  IsSuccess: false,
  IsError: false,
  E_message: "",
  data: [] as RoomData[],
};

export const getAllRoomsFn = createAsyncThunk(
  "All rooms",
  async (_, { rejectWithValue }) => {
    try {
      const Token = JSON.parse(localStorage.getItem("userDetail")!).token;
      const res = await axios.get<roomsResponse>(`${Url}/rooms/all`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || Err_Message);
      return rejectWithValue(Err_Message);
    }
  }
);

export const getAllRoomsSlice = createSlice({
  name: "All Rooms",
  reducers: {},
  initialState,
  extraReducers(builder) {
    // Pending Case
    builder.addCase(getAllRoomsFn.pending, () => ({
      ...initialState,
      IsLoadidng: true,
    }));
    // Fullfilled Case
    builder.addCase(getAllRoomsFn.fulfilled, (_, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }));
    // Rejected Case
    builder.addCase(getAllRoomsFn.rejected, (_, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }));
  },
});
