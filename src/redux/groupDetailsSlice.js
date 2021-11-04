import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rights: "",
  info: {
    groupName: "",
    groupPicture: undefined,
    owner: null,
    description: "",
  },
  requests: [],
  members: [],
  groupAlbums: [],
};

export const groupDetailsSlice = createSlice({
  name: "groupDetails",
  initialState: initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      state.info.groupName = action.payload.groupName;
      state.info.groupPicture =
        action.payload.groupPicture !== undefined
          ? action.payload.groupPicture
          : undefined;
      state.info.owner = action.payload.owner;
      state.info.description = action.payload.description;
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
        groupPicture: undefined,
        owner: null,
        description: "",
      };
      state.requests = [];
      state.groupAlbums = [];
      state.members = [];
      state.rights = "";
    },
  },
});

// actions
export const {
  setBasicInfo,
  setRights,
  setMembers,
  setGroupAlbums,
  setRequests,
  clearStore,
} = groupDetailsSlice.actions;

// exporting selects
export const selectBasicInfo = (state) => state.groupDetails.info;
export const selectGroupName = (state) => state.groupDetails.info.groupName;
export const selectGroupPicture = (state) =>
  state.groupDetails.info.groupPicture;
export const selectDescription = (state) => state.groupDetails.info.description;
export const selectOwner = (state) => state.groupDetails.info.owner;
export const selectMembers = (state) => state.groupDetails.members;
export const selectRequests = (state) => state.groupDetails.requests;
export const selectGroupAlbums = (state) => state.groupDetails.groupAlbums;
export const selectRights = (state) => state.groupDetails.rights;

export default groupDetailsSlice.reducer;
