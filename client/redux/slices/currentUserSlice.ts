import { createSlice } from '@reduxjs/toolkit';
import cookies from "react-cookies";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { user: cookies.load("user") || null },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            cookies.remove("accessToken");
            cookies.remove("user");
        },
    },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
