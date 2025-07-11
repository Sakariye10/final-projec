import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, Err_Message } from "../../../Interfaces";

interface customerResponse {
    IsSuccess : boolean,
    result : Customer[]
}

interface Customer {
    Cu_Id: Number,
    Cu_Name: String,
    Cu_Phone: String,
    Cu_Address: String,
    Cu_Balance: Number,
    Author_Id: Number,
    Created_At: String,
    Updated_At: String
}


const initialState = {
    IsLoading: false,
    IsSuccess: false,
    IsError: false,
    E_message: '',
    data: [] as Customer []
}

export const getAllCustomersFn = createAsyncThunk(
    'All Customers',
    async (_, { rejectWithValue }) => {
        try {
            const Token = JSON.parse(localStorage.getItem("userInfo")!).token;
            const res = await axios.get<customerResponse>(`${Url}/customer/all`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            return res.data
        } catch (error) {
            if (error instanceof AxiosError)
                return rejectWithValue(error.response?.data.messsage || Err_Message)
            return rejectWithValue(Err_Message)
        }
    }
)




export const getAllCustomerSlice = createSlice({
    name: 'All Custoemrs',
    reducers: {},
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(getAllCustomersFn.pending, () => ({
            ...initialState,
            IsLoading: true,
        }));
        // Fullfilled Case
        builder.addCase(getAllCustomersFn.fulfilled, (_, action) => ({
            ...initialState,
            IsSuccess: true,
            data: action.payload
        }));
        // Rejected Case
        builder.addCase(getAllCustomersFn.rejected, (_, action) => ({
            ...initialState,
            IsError: true,
            E_message: String(action.payload)
        }))
    },
})