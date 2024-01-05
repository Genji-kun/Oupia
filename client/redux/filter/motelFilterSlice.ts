"use client"

import { createSlice, current } from "@reduxjs/toolkit"

interface MotelFilter {
    assetType: string[],
    price: number[]
}

const initialState: MotelFilter = {
    assetType: [],
    price: [0, 50000000]
}

const motelFilterSlice = createSlice({
    name: "motelFilter",
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            if (action.payload.assetType) {
                state.assetType = action.payload.assetType;
            }
            if (action.payload.price) {
                state.price = action.payload.price;
            }
        }
    }
})

export const { changeFilter } = motelFilterSlice.actions;

export default motelFilterSlice.reducer;