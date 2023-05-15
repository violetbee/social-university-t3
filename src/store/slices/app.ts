import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    currentSlider: 0,
    isShareOpen: true,
  },
  reducers: {
    setSlider: (state, action) => {
      state.currentSlider = action.payload;
    },
    setIsShareOpen: (state) => {
      state.isShareOpen = !state.isShareOpen;
    },
  },
});

export const { setSlider, setIsShareOpen } = appSlice.actions;
