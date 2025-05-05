import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios  , {AxiosError}  from 'axios'
import { Url , Err_Message } from '../../../Interfaces'


interface roomsResponse {
    IsSuccess : boolean,
    result : []
}

const initialState = {
    IsLoadidng : false,
    IsSuccess : false,
    IsError :  false,
    E_message : '',
    data : []
}


export const getAllRoomsFn = createAsyncThunk(
    'All rooms',
    async(_ , {rejectWithValue}) => {
        try {
            const Token = JSON.parse(localStorage.getItem("userDetail")!).token
            const res = await axios.get(`${Url}/rooms/all` , {
                headers : {
                    Authorization : `Bearer ${Token}`
                }
            } )

            return res.data
        } catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || Err_Message)
            return rejectWithValue(Err_Message)
        }
    }
)


export const getAllRoomsSlice = createSlice({
    name : 'All Rooms',
    reducers : {},
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(getAllRoomsFn.pending , () => ({
            ...initialState,
            IsLoadidng : true,
        }));
        // Fullfilled Case
        builder.addCase(getAllRoomsFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));
        // Rejected Case
        builder.addCase(getAllRoomsFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})