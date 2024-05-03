"use client"

import { configureStore } from "@reduxjs/toolkit";
import assetFilterSlice from "./slices/assetFilterSlice";
import currentUserSlice from "./slices/currentUserSlice";
import searchHistorySlice from "./slices/searchHistorySlice";

export const store = configureStore({
    reducer: {
        assetFilterSlice: assetFilterSlice,
        currentUserSlice: currentUserSlice,
        searchHistorySlice: searchHistorySlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
