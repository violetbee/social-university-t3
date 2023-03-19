import { createSlice } from "@reduxjs/toolkit";

export const universitySlice = createSlice({
  name: "university",
  initialState: {
    universityId: "not selected",
  },
  reducers: {
    setUniversityId: (state, action) => {
      state.universityId = action.payload;
    },
    getUniversityId: (state) => {
      state.universityId;
    },
  },
});

export const { setUniversityId, getUniversityId } = universitySlice.actions;
