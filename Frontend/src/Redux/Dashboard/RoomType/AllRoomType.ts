import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, Err_Message } from "../../../Interfaces";

interface roomType {
  IsSuccess: boolean;
  result: RoomTs[];
}

interface RoomTs {
  Rt_Id: number;
  Rt_Name: string;
  Rt_Price: string;
  No_Beds: string;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
}

const initialState = {
  IsSuccess: false,
  IsLoading: false,
  IsError: false,
  E_message: "",
  data: [] as RoomTs[],
};

export const getAllRoomTypesFn = createAsyncThunk(
  "RoomType",
  async (_, { rejectWithValue }) => {
    try {
      const Token = JSON.parse(localStorage.getItem("userInfo")!).token;
      const res = await axios.get<roomType>(`${Url}/roomtype/all` , {
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



export const getAllRoomTypesSlice = createSlice({
    name : 'All Rooms Types',
    reducers : {},
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(getAllRoomTypesFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));
        // Fullfilled Case
        builder.addCase(getAllRoomTypesFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));
        // Rejecetd Case
        builder.addCase(getAllRoomTypesFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})