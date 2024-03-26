"use client"

import { configureStore } from "@reduxjs/toolkit";
import assetFilterSlice from "./slices/assetFilterSlice";
import currentUserSlice from "./slices/currentUserSlice";

export const store = configureStore({
    reducer: {
        assetFilterSlice: assetFilterSlice,
        currentUserSlice: currentUserSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
