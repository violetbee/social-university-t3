import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    currentSlider: 0,
  },
  reducers: {
    setSlider: (state, action) => {
      state.currentSlider = action.payload;
    },
  },
});

export const { setSlider } = appSlice.actions;
