// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    bgColor: "rgba(255, 255, 255,0.5)",
    selectedTab: 1,
  },
  reducers: {
    setBgColor: (state, action) => {
      state.bgColor = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setBgColor, setSelectedTab } = layoutSlice.actions;

export default layoutSlice.reducer;
