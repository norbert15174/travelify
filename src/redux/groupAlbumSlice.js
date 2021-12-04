import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupOwner: null,
  albumOwner: null,
  rights: "",
  info: {
    coordinate: null,
    description: "",
    name: "",
    albumId: null,
    groupId: null,
    creationTime: "",
  },
  albumPhotos: [],
  photoTags: [],
};

export const groupAlbumDetailsSlice = createSlice({
  name: "groupAlbumDetails",
  initialState: initialState,
  reducers: {
    setGroupOwner: (state, action) => {
      state.groupOwner = action.payload;
    },
    setAlbumOwner: (state, action) => {
      state.albumOwner = action.payload;
    },
    setRights: (state, action) => {
      state.rights = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setPhotoTags: (state, action) => {
      state.photoTags = action.payload;
    },
    setAlbumPhotos: (state, action) => {
      state.albumPhotos = action.payload;
    },
    clearStore: (state) => {
      state.info = {
        coordinate: null,
        description: "",
        name: "",
        albumId: null,
        groupId: null,
        creationTime: "",
      };
      state.albumPhotos = [];
      state.photoTags = [];
      state.rights = "";
      state.groupOwner = null;
      state.albumOwner = null;
    },
  },
});

// actions
export const {
  setGroupOwner,
  setAlbumOwner,
  setRights,
  setAlbumPhotos,
  setInfo,
  clearStore,
  setPhotoTags,
} = groupAlbumDetailsSlice.actions;

// exporting selects
export const selectInfo = (state) => state.groupAlbumDetails.info;
export const selectAlbumOwner = (state) => state.groupAlbumDetails.albumOwner;
export const selectGroupOwner = (state) => state.groupAlbumDetails.groupOwner;
export const selectAlbumPhotos = (state) => state.groupAlbumDetails.albumPhotos;
export const selectRights = (state) => state.groupAlbumDetails.rights;
export const selectPhotoTags = (state) => state.groupAlbumDetails.photoTags;
export const selectGroupId = (state) => state.groupAlbumDetails.info.groupId;

export default groupAlbumDetailsSlice.reducer;
