// app/store/appState.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types/appState';

const initialState: AppState = {
  current_page: 'authentication/signin',
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.current_page = action.payload;
    },
  },
});

export const { setCurrentPage } = appStateSlice.actions;
export default appStateSlice.reducer;
