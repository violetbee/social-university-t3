import { configureStore } from "@reduxjs/toolkit";
import { universitySlice } from "./slices/universitySlice";
import { appSlice } from "./slices/app";

export const store = configureStore({
  reducer: {
    university: universitySlice.reducer,
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
