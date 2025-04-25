import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './Pages/Login';


export const store = configureStore({
    reducer : {
        login : loginSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>; // useSelector
export type AppDispatch = typeof store.dispatch; // useDispatch