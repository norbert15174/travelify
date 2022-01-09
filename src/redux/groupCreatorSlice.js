import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupName: "",
  groupPicture: undefined,
  description: "",
  members: [],  
};

export const groupCreatorSlice = createSlice({
  name: "groupCreator",
  initialState: initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      state.groupName = action.payload.groupName;
      state.description = action.payload.description;
    },
    setGroupName: (state, action) => {
      state.groupName = action.payload;
    },
    setGroupPicture: (state, action) => {
      state.groupPicture = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    clearStore: (state) => {
      state.groupName = "";
      state.groupPicture = "";
      state.description = "";
      state.members = [];
    },
  },
});

// actions
export const {
  setGroupName,
  setBasicInfo,
  setGroupPicture,
  setDescription,
  setMembers,
  clearStore,
} = groupCreatorSlice.actions;

// exporting selects
export const selectGroupName = (state) => state.groupCreator.groupName;
export const selectDescription = (state) =>
  state.groupCreator.description;
export const selectGroupPicture = (state) => state.groupCreator.groupPicture;
export const selectMembers = (state) => state.groupCreator.members;

export default groupCreatorSlice.reducer;
