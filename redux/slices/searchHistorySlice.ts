import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type History = {
    assetSlug: string,
    result: string,
}

const searchHistorySlice = createSlice({
    name: 'searchHistories',
    initialState: [] as History[],
    reducers: {
        addHistory: (state, action: PayloadAction<History>) => {
            if (!state.find(history => history.assetSlug === action.payload.assetSlug)) {
                state.push(action.payload);
            }
        },
        clearHistory: () => {
            return [];
        },
        removeHistory: (state, action: PayloadAction<History>) => {
            return state.filter(history => history.assetSlug !== action.payload.assetSlug);
        }
    }
});

export const { addHistory, clearHistory, removeHistory } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
