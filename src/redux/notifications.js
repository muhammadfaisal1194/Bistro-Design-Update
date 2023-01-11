// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notificationsList: [],
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notificationsList = action.payload;
    },
  },
});

export const { setNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
