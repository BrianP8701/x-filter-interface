// app/store/appState.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types/appState';

const initialState: AppState = {
  current_page: 'authentication/signin',
  current_filter_id: '',
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      const segments = action.payload.split('/');
      const filteredSegments = segments.filter((segment, index, array) =>
        index === 0 || segment !== array[index - 1]
      );
      state.current_page = filteredSegments.join('/');
    },
  },
});

export const { setCurrentPage } = appStateSlice.actions;
export default appStateSlice.reducer;
