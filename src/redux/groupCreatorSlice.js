import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupName: "",
    groupPicture: "",
    groupDescription: "",
    members: [],

};

export const groupCreatorSlice = createSlice({
  name: "groupCreator",
  initialState: initialState,
  reducers: {
        setGroupName: (state, action) => {
            state.groupName = action.payload;
        },
        setGroupPicture: (state, action) => {
            state.groupPicture = action.payload;
        },
        setGroupDescription: (state, action) => {
            state.groupDescription = action.payload;
        },
        setMembers: (state, action) => {
            state.members = action.payload;
        },
        clearStore: (state) => {
            state.groupName = "";
            state.groupPicture = "";
            state.groupDescription = "";
            state.members = [];
        },
  },
});

// actions
export const { setGroupName, setGroupPicture, setGroupDescription, setMembers, clearStore} = groupCreatorSlice.actions;

// exporting selects
export const selectGroupName = (state) => state.groupCreator.groupName;
export const selectGroupDescription = (state) => state.groupCreator.groupDescription;
export const selectGroupPicture = (state) => state.groupCreator.groupPicture;
export const selectMembers = (state) => state.groupCreator.members;

export default groupCreatorSlice.reducer;
