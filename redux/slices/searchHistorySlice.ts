import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('searchHistory');
        if (serializedState === null) return [];
        return JSON.parse(serializedState);
    } catch {
        return [];
    }
};

const saveToLocalStorage = (state: any) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('searchHistory', serializedState);
};

export type History = {
    assetSlug: string,
    result: string,
}

const searchHistorySlice = createSlice({
    name: 'searchHistories',
    initialState: loadFromLocalStorage() as History[],
    reducers: {
        addHistory: (state, action) => {
            if (!state.find(history => history.assetSlug === action.payload.assetSlug)) {
                state.push(action.payload);
                saveToLocalStorage(state);
            }
        },
        clearHistory: (state) => {
            state = [];
        },
        removeHistory: (state, action) => {
            state = state.filter(history => history.assetSlug !== action.payload.assetSlug);
            saveToLocalStorage(state);
        }
    }
});

export const { addHistory, clearHistory, removeHistory } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
