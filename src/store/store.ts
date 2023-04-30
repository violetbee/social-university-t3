import { configureStore } from "@reduxjs/toolkit";
import { universitySlice } from "./slices/universitySlice";
import { appSlice } from "./slices/app";

export const store = configureStore({
  reducer: {
    university: universitySlice.reducer,
    app: appSlice.reducer,
  },
});

export default store;
