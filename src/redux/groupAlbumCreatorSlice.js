import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainPhoto: null,
  rights: "",
  albumPhotos: [],
  basicInfo: {
    name: "",
    description: "",
  },
  coordinate: null,
};

export const groupAlbumCreatorSlice = createSlice({
  name: "groupAlbumCreator",
  initialState: initialState,
  reducers: {
    setRights: (state, action) => {
      state.rights = action.payload;
    },
    setAlbumPhotosRedux: (state, action) => {
      state.albumPhotos = action.payload;
    },
    setMainPhotoRedux: (state, action) => {
      state.mainPhoto = action.payload;
    },
    setBasicInfo: (state, action) => {
      state.basicInfo.name = action.payload.name;
      state.basicInfo.description = action.payload.description;
    },
    setCoordinate: (state, action) => {
      state.coordinate = {
        country: action.payload.country,
        id: action.payload.id,
        lang: action.payload.lang,
        lat: action.payload.lat,
        place: action.payload.place,
      };
    },
    clearStore: (state) => {
      state.albumPhotos = [];
      state.mainPhoto = null;
      state.basicInfo = {
        name: "",
        description: "",
      };
      state.coordinate = null;
    },
  },
});

// actions
export const {
  setAlbumPhotosRedux,
  setCoordinate,
  setBasicInfo,
  setRights,
  setMainPhotoRedux,
  clearStore,
} = groupAlbumCreatorSlice.actions;

// exporting selects
export const selectRights = (state) => state.groupAlbumCreator.rights;
export const selectAlbumPhotosRedux = (state) => state.groupAlbumCreator.albumPhotos;
export const selectMainPhotoRedux = (state) => state.groupAlbumCreator.mainPhoto;
export const selectBasicInfo = (state) => state.groupAlbumCreator.basicInfo;
export const selectAlbumName = (state) => state.groupAlbumCreator.basicInfo.name;
export const selectCoordinate = (state) => state.groupAlbumCreator.coordinate;

export default groupAlbumCreatorSlice.reducer;
