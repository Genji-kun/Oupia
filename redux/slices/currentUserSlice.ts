import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react'
import cookies from "react-cookies";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { currentUser: cookies.load("user") || null },
    reducers: {
        login: (state, action) => {
            cookies.save("user", action.payload, {});
            state.currentUser = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("accessToken");
            cookies.remove("user");
            signOut({ redirect: false })
            state.currentUser = null;
        },
    },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
