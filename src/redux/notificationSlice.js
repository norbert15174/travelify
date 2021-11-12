import { createSlice } from "@reduxjs/toolkit";

// toggle blur when modal shows up

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    albumId: null,
    photoId: null,
  },
  reducers: {
    setNotification: (state, action) => {
      state.albumId = action.payload.albumId;
      state.photoId = action.payload.photoId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotification } = notificationSlice.actions;
export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
