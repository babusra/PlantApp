import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppState = {
  isStarted: boolean;
  hasOnboarded: boolean;
};

const initialState: AppState = {
  isStarted: false,
  hasOnboarded: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload;
    },
    setHasOnboarded: (state, action: PayloadAction<boolean>) => {
      state.hasOnboarded = action.payload;
    },
  },
});

export const { setStarted, setHasOnboarded } = appSlice.actions;
export default appSlice.reducer;
