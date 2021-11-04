import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  owner: null,
  rights: "",
  albumPhotos: [],
  members: [],
  info: null,
  photoTags: [],
};

export const groupAlbumDetailsSlice = createSlice({
  name: "groupAlbumDetails",
  initialState: initialState,
  reducers: {
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
    setRights: (state, action) => {
      state.rights = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setMembers: (state, action) => {
      state.info = action.payload;
    },
    setPhotoTags: (state, action) => {
      state.photoTags = action.payload;
    },
    setAlbumPhotos: (state, action) => {
      state.albumPhotos = action.payload;
    },
    clearStore: (state) => {
      state.info = null;
      state.albumPhotos = [];
      state.rights = "";
      state.owner = null;
      state.members = [];
    },
  },
});

// actions
export const {
  setOwner,
  setRights,
  setAlbumPhotos,
  setInfo,
  clearStore,
  setPhotoTags,
  setMembers,
} = groupAlbumDetailsSlice.actions;

// exporting selects
export const selectInfo = (state) => state.groupAlbumDetails.info;
export const selectOwner = (state) => state.groupAlbumDetails.owner;
export const selectAlbumPhotos = (state) => state.groupAlbumDetails.albumPhotos;
export const selectRights = (state) => state.groupAlbumDetails.rights;
export const selectAlbumType = (state) => state.groupAlbumDetails.albumType;
export const selectPhotoTags = (state) => state.groupAlbumDetails.photoTags;
export const selectMembers = (state) => state.groupAlbumDetails.members;

export default groupAlbumDetailsSlice.reducer;
