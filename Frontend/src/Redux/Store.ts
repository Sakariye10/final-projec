import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './Pages/Login';
import { getAllUsersSlice } from './Dashboard/Users/AllUsers';
import { newUserSlice } from './Dashboard/Users/NewUser';
import userInfoSlice from './Pages/UserInfo';
import { getAllRoomTypesSlice } from './Dashboard/RoomType/AllRoomType';
import { getAllRoomsSlice } from './Dashboard/Rooms/AllRooms';
import { getAllfloorsSlice } from './Dashboard/Floor/AllFloor';
import { newFloorSlice } from './Dashboard/Floor/NewFloor';
import { newRoomTypeSlice } from './Dashboard/RoomType/NewRoomType';
import { getAllBookingSlice } from './Dashboard/Booking/AllBooking';
import { getAllCustomerSlice } from './Dashboard/Customer/AllCustomer';
import { newRoomSlice } from './Dashboard/Rooms/NewRoom';


export const store = configureStore({
    reducer : {
        login : loginSlice.reducer,
        userInfo : userInfoSlice.reducer,

        // Pages Endpoints Starts In Here 
        // User Endpoints
        AllUsers : getAllUsersSlice.reducer,
        NewUser : newUserSlice.reducer,

        // Floor Endpoints
        AllFloor : getAllfloorsSlice.reducer,
        NewFloor : newFloorSlice.reducer,

        // RoomType Endpoints
        AllRoomTypes : getAllRoomTypesSlice.reducer,
        NewRoomType : newRoomTypeSlice.reducer,

        // Room Endpoints
        AllRoom : getAllRoomsSlice.reducer,
        NewRoom : newRoomSlice.reducer,

        // Booking Endpoints
        AllBookings : getAllBookingSlice.reducer,

        // Customer Endpoints 
        AllCustomer : getAllCustomerSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>; // useSelector
export type AppDispatch = typeof store.dispatch; // useDispatch