import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react'
import Cookies from "js-cookie";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { currentUser: Cookies.get("user") || null },
    reducers: {
        login: (state, action) => {
            Cookies.set("user", action.payload);
            state.currentUser = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("accessToken");
            Cookies.remove("user");
            signOut({ redirect: false })
            state.currentUser = null;
        },
    },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
