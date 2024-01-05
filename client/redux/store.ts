"use client"

import { configureStore } from "@reduxjs/toolkit";
import motelFilterReducer from "./filter/motelFilterSlice";

export const store = configureStore({
    reducer: {
        motelFilter: motelFilterReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
