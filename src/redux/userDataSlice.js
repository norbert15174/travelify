import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  surName: null,
  profilePicture: null,
  friendsList: null,
  groupsList: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surName = action.payload.surName;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    setFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setGroupsList: (state, action) => {
      state.groupsList = action.payload;
    },
    clearStore: (state) => {
      state.id = null;
      state.name = null;
      state.surName = null;
      state.profilePicture = null;
      state.friendsList = null;
    },
  },
});

// actions
export const { setProfilePicture, setUserData, setFriendsList, setGroupsList, clearStore } = userDataSlice.actions;

// exporting selects
export const selectUserData = (state) => state.userData;
export const selectProfilePicture = (state) => state.userData.profilePicture;
export const selectFriendsList = (state) => state.userData.friendsList;
export const selectGroupsList = (state) => state.userData.groupsList;


export default userDataSlice.reducer;
