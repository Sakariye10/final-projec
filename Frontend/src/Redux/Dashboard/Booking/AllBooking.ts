import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, Err_Message } from "../../../Interfaces";

interface bookingResponse {
  IsSuccess: boolean;
  result: Booking[];
}

interface Booking {
  Bk_Id: number;
  Cu_Name: string;
  Cu_Phone: string;
  R_Id: number;
  Price: number;
  B_Days: number;
  Total: number;
  Paid: number;
  Balance: number;
  Us_Id: number;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
  Room: {
    R_No: string;
    R_Type: {
      Rt_Name: string;
    };
  };
}

const initialState = {
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  E_message: "",
  data: [] as Booking[],
};

export const getAllBookingFn = createAsyncThunk(
  "All Bookings",
  async (_, { rejectWithValue }) => {
    try {
      const Token = JSON.parse(localStorage.getItem("userInfo")!).token;
      const res = await axios.get<bookingResponse>(`${Url}/booking/all`, {
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

export const getAllBookingSlice = createSlice({
  name: "All Bookings",
  reducers: {},
  initialState,
  extraReducers(builder) {
    // Pending State
    builder.addCase(getAllBookingFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }));
    // Fullfilled Case
    builder.addCase(getAllBookingFn.fulfilled, (_, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }));
    // Rejected Case
    builder.addCase(getAllBookingFn.rejected, (_, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }));
  },
});
