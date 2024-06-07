"use client"

import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { currentUser: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
