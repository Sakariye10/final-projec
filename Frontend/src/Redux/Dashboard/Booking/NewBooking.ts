import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios , { AxiosError} from 'axios'
import { Url , Err_Message } from '../../../Interfaces'


const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    Err_message : '',
    data : {}
}


export const newBookingFn = createAsyncThunk(
    'New Booking',
    async( data : any , {rejectWithValue}) => {
        try {
            const Token = JSON.parse(localStorage.getItem("userInfo")!).token;
            const res = await axios.post(`${Url}/booking/new` , data , {
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



export const newBookingSlice = createSlice({
    name : "New Booking",
    reducers : {
        resetBookingState : () =>  initialState
    },
    initialState,
    extraReducers(builder) {
        builder.addCase(newBookingFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }))
        builder.addCase(newBookingFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))
        builder.addCase(newBookingFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            Err_message : String(action.payload)
        }))
    },
})



export const { resetBookingState } = newBookingSlice.actions