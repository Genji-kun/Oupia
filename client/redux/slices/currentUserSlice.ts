import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react'
import cookies from "react-cookies";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { currentUser: cookies.load("user") || null },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            signOut({ redirect: false })
            state.currentUser = null;
            cookies.remove("accessToken");
            cookies.remove("user");
        },
    },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
