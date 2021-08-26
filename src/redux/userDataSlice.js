import { createSlice } from "@reduxjs/toolkit";

// jeśli użytkownik nie jest zautoryzowany to nie będą mu się pojawiać ekrany

const initialState = {
  id: null,
  login: null,
  role: "[ROLE_VISITOR]",
  firstName: null,
  surName: null,
  friendsList: null,
  profilePicture: null,
  backgroundPicture: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      // during transition after logging in this will be set
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.surName = action.payload.surName;
    },
    setLoggedUser: (state, action) => {
      // after logging in this will be set
      state.login = action.payload.login;
      state.role = action.payload.role;
    },
    setLoggedUserFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    setBackgroundPicture: (state, action) => {
      state.backgroundPicture = action.payload;
    }
  },
});

// actions
export const { setUserData, setLoggedUser, setLoggedUserFriendsList, setProfilePicture, setBackgroundPicture } = userDataSlice.actions;

// exporting selects
export const selectUserId = (state) => state.userData.id;
export const selectLoggedUser = (state) => { return { login: state.userData.login, role: state.userData.role}};
export const selectLoggedUserFirstname = (state) => state.userData.firstName;
export const selectLoggedUserLastname = (state) => state.userData.surName;
export const selectLoggedUserFriendsList = (state) => state.userData.friendsList;
export const selectProfilePicture = (state) => state.userData.profilePicture;
export const selectBackgroundPicture = (state) => state.userData.backgroundPicture;

export default userDataSlice.reducer;
