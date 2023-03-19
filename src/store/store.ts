import { configureStore } from "@reduxjs/toolkit";
import { universitySlice } from "./slices/universitySlice";

export const store = configureStore({
  reducer: {
    university: universitySlice.reducer,
  },
});

export default store;
