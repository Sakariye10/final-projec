import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './Pages/Login';
import { getAllUsersSlice } from './Dashboard/Users/AllUsers';
import { newUserSlice } from './Dashboard/Users/NewUser';
import userInfoSlice from './Pages/UserInfo';
import { getAllRoomTypesSlice } from './Dashboard/RoomType/AllRoomType';
import { getAllRoomsSlice } from './Dashboard/Rooms/AllRooms';


export const store = configureStore({
    reducer : {
        login : loginSlice.reducer,
        userInfo : userInfoSlice.reducer,

        // Pages Endpoints Starts In Here 
        // User Endpoints
        AllUsers : getAllUsersSlice.reducer,
        NewUser : newUserSlice.reducer,

        // RoomType Endpoints
        AllRoomTypes : getAllRoomTypesSlice.reducer,


        // Room Endpoints
        AllRoom : getAllRoomsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>; // useSelector
export type AppDispatch = typeof store.dispatch; // useDispatch