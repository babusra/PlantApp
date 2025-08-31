import { combineReducers, configureStore } from "@reduxjs/toolkit";
import app from "./appSlice";

const rootReducer = combineReducers({ app });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
