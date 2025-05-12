import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, Err_Message } from "../../../Interfaces";

interface FloorResponse {
  IsSuccess: boolean;
  result: Floor[];
}

interface Floor {
  F_Id: number;
  F_No: string;
  No_Rooms: string;
  Author_Id: number;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
}

const initialState = {
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  E_Message: "",
  data: [] as Floor[],
};

export const getAllFloorsFn = createAsyncThunk(
  "getAll floors",
  async (_, { rejectWithValue }) => {
    try {
      const Token = JSON.parse(localStorage.getItem("userInfo")!).token;
      const res = await axios.get<FloorResponse>(`${Url}/floor/all` , {
        headers : {
          Authorization : `Bearer ${Token}`
        }
      });
      return res.data.result
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || Err_Message);
      return rejectWithValue(Err_Message);
    }
  }
);

export const getAllfloorsSlice = createSlice({
  name: "All Fllors",
  reducers: {},
  initialState,
  extraReducers(builder) {
    // Pending Case
    builder.addCase(getAllFloorsFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }));
    // Fullfilled Case
    builder.addCase(getAllFloorsFn.fulfilled, (_, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }));
    // Rejected Case
    builder.addCase(getAllFloorsFn.rejected, (_, action) => ({
      ...initialState,
      IsError: true,
      E_Message: String(action.payload),
    }));
  },
});
