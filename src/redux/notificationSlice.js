import { createSlice } from "@reduxjs/toolkit";

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

export const { setNotification } = notificationSlice.actions;
export const selectNotification = (state) => state.notification;
export default notificationSlice.reducer;



