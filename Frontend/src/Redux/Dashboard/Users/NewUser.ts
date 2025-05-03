import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios , { AxiosError} from "axios";
import { Url , Err_Message } from "../../../Interfaces";

const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_message : '',
    data : {}
}


export const newUsersFn = createAsyncThunk(
    'user/new',
    async(data : any , {rejectWithValue}) => {
        try {
            const res = await axios.post(`${Url}/user/new` , data)
            return res.data
        } catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || Err_Message)
            return rejectWithValue(Err_Message)
        }
    }
)


export const newUserSlice = createSlice({
    name : 'New User',
    reducers : {
        resetUserState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // pending case
        builder.addCase(newUsersFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));
        // Fullfilled Case
        builder.addCase(newUsersFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));
        // Rejected Case
        builder.addCase(newUsersFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})



export const { resetUserState } = newUserSlice.actions