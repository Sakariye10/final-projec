import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import axios , { AxiosError } from 'axios'
import { Url , Err_Message } from '../../Interfaces'


const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_message : '',
    data : {}
}


export const loginFn = createAsyncThunk(
    'login',
    async( data:any , {rejectWithValue}) => {
        try {
            const res = await axios.post(`${Url}/user/login` , data)
            return res.data
        } catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || Err_Message)
            return rejectWithValue(Err_Message)
        }
    }
    
)


export const loginSlice = createSlice({
    name : 'login',
    reducers : {
        resetLoginState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(loginFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));
        // Fullfilled Case
        builder.addCase(loginFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));
        // Rejected Case
        builder.addCase(loginFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})

export const { resetLoginState } = loginSlice.actions