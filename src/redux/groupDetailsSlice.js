import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rights: "",
  info: {
    groupName: "",
    groupPicture: "",
    owner: null,
    description: "",
  },
  requests: [],
  members: null,
  groupAlbums: [],
};

export const groupDetailsSlice = createSlice({
  name: "groupDetails",
  initialState: initialState,
  reducers: {
    setGroupName: (state, action) => {
      state.info.groupName = action.payload;
    },
    setGroupPicture: (state, action) => {
      state.info.groupPicture = action.payload;
    },
    setOwner: (state, action) => {
      state.info.owner = action.payload;
    },
    setDescription: (state, action) => {
      state.info.description = action.payload;
    },
    setRights: (state, action) => {
      state.rights = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setGroupAlbums: (state, action) => {
      state.groupAlbums = action.payload;
    },

    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    clearStore: (state) => {
      state.info = {
        groupName: "",
        groupPicture: "",
        owner: null,
        description: "",
      };
      state.requests = [];
      state.groupAlbums = [];
      state.members = null;
      state.rights = "";
    },
  },
});

// actions
export const {
  setOwner,
  setRights,
  setGroupName,
  setGroupPicture,
  setMembers,
  setGroupAlbums,
  setDescription,
  clearStore,
} = groupDetailsSlice.actions;

// exporting selects
export const selectGroupInfo = (state) => state.groupDetails.info;
export const selectMembers = (state) => state.groupDetails.Members;
export const selectRequests = (state) => state.groupDetails.requests;
export const selectGroupAlbums = (state) => state.groupDetails.groupAlbums;
export const selectRights = (state) => state.groupDetails.rights;

export default groupDetailsSlice.reducer;
