// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appStateReducer from "./appState";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    appState: appStateReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
