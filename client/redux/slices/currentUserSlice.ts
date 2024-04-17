import { createSlice } from '@reduxjs/toolkit';
import cookies from "react-cookies";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { currentUser: cookies.load("user") || null },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            cookies.remove("accessToken");
            cookies.remove("user");
        },
    },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
