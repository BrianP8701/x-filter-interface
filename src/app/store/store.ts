// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from "./userSlice";
import appStateReducer from "./appState";
import filterReducer from "./filterSlice";
import chatReducer from "./chatSlice";
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'appState', 'filter', 'chat'], // You can choose which reducers to persist here
};

const rootReducer = combineReducers({
  user: userReducer,
  appState: appStateReducer,
  filter: filterReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
