import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , { AxiosError} from "axios";
import { Url , Err_Message } from "../../../Interfaces";


const initialState = {
    IsLoading : true,
    IsSuccess : true,
    IsError : true,
    E_message : '',
    data : {}
}


export const newRoomFn = createAsyncThunk(
    'New Room',
    async(data : any , {rejectWithValue}) => {
        try {
            const Token = JSON.parse(localStorage.getItem("userInfo")!).token;
            const res = await axios.post(`${Url}/rooms/new` , data , {
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

export const newRoomSlice = createSlice({
    name : 'New Room',
    reducers : {
        resetRoomState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(newRoomFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));
        // Fullfilled Case
        builder.addCase(newRoomFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));
        // Rejected case
        builder.addCase(newRoomFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})


export const { resetRoomState } = newRoomSlice.actions