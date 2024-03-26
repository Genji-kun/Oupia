"use client"

import { createSlice } from "@reduxjs/toolkit"

interface AssetFilter {
    assetType: string[],
    price: number[]
}

const initialState: AssetFilter = {
    assetType: [],
    price: [0, 50000000]
}

const assetFilterSlice = createSlice({
    name: "assetFilter",
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

export const { changeFilter } = assetFilterSlice.actions;

export default assetFilterSlice.reducer;