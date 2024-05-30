import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import assetFilterSlice from "./slices/assetFilterSlice";
import currentUserSlice from "./slices/currentUserSlice";
import searchHistorySlice from "./slices/searchHistorySlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["searchHistorySlice"],
};

const rootReducer = combineReducers({
    assetFilterSlice,
    currentUserSlice,
    searchHistorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
