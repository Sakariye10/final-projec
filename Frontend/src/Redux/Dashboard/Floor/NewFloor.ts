import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios , { AxiosError } from "axios";
import { Url , Err_Message } from "../../../Interfaces";

const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_message : '',
    data : {}
}


export const newfloorFn = createAsyncThunk(
    'Adding New Floor',
    async(data : any , {rejectWithValue}) => {
        try {
            const Token = JSON.parse(localStorage.getItem("userInfo")!).token;
            const res = await axios.post(`${Url}/floor/new`, data , {
                headers : {
                    Authorization : `Bearer ${Token}`
                }
            })
            return res.data
        } catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || Err_Message)
            return rejectWithValue(Err_Message)
        }
    }
)


export const newFloorSlice = createSlice({
    name : 'New Floor',
    reducers : {
        resetFloorState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(newfloorFn.pending , () => ({
            ...initialState,
            IsLoading :  true
        }));
        // Fullfilled Case
        builder.addCase(newfloorFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));
        // Rejected Case
        builder.addCase(newfloorFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})


export const { resetFloorState } = newFloorSlice.actions