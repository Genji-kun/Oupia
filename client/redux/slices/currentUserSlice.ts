import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { user: cookieStore.get("user") || null },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            cookieStore.delete("user");
            state.user = null;
        },
    },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
