import { createSlice } from "@reduxjs/toolkit";

// jeśli użytkownik nie jest zautoryzowany to nie będą mu się pojawiać ekrany

const initialState = {
  id: null,
  name: null,
  surName: null,
  profilePicture: null,
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
  },
});

// actions
export const { setProfilePicture, setUserData } = userDataSlice.actions;

// exporting selects
export const selectUserData = (state) => state.userData;
export const selectProfilePicture = (state) => state.userData.profilePicture;


export default userDataSlice.reducer;
