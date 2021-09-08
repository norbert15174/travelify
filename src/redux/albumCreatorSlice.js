import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainPhoto: null,
    albumPhotos: [],
    basicInfo: {
        public: null,
        name: "",
        sharedPersonList: [],
        description: "",
    },
    coordinate: null,
};

export const albumCreatorSlice = createSlice({
  name: "albumCreator",
  initialState: initialState,
  reducers: {
        setAlbumPhotosRedux: (state, action) => {
            state.albumPhotos = action.payload;
        },
        setMainPhotoRedux: (state, action) => {
            state.mainPhoto = action.payload;
        },
        setName: (state, action) => {
            state.basicInfo.name = action.payload;
        },
        setSharedPersonList: (state, action) => {
            state.basicInfo.sharedPersonList = action.payload;
        },
        setDescription: (state, action) => {
            state.basicInfo.description = action.payload;
        },
        makePublic: (state) => {
            state.basicInfo.public = true;
        },
        makePrivate: (state) => {
            state.basicInfo.public = false;
        },
        setBasicInfo: (state, action) => {
            state.basicInfo.name = action.payload.name;
            state.basicInfo.public = action.payload.public;
            state.basicInfo.sharedPersonList = action.payload.sharedPersonList;
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
                public: null,
                name: "",
                sharedPersonList: [],
                description: "",
            };
            state.coordinate = null;
        },
  },
});

// actions
export const { setAlbumPhotosRedux, setCoordinate, setBasicInfo, setSharedPersonList, setName, makePrivate, makePublic, setMainPhotoRedux, clearStore, setDescription } = albumCreatorSlice.actions;

// exporting selects
export const selectAlbumPhotosRedux = (state) => state.albumCreator.albumPhotos;
export const selectMainPhotoRedux = (state) => state.albumCreator.mainPhoto;
export const selectBasicInfo = (state) => state.albumCreator.basicInfo;
export const selectAlbumName = (state) => state.albumCreator.basicInfo.name;
export const selectAlbumVisibility = (state) => state.albumCreator.basicInfo.public;
export const selectSharedPersonList = (state) => state.albumCreator.basicInfo.sharedPersonList;
export const selectCoordinate = (state) => state.albumCreator.coordinate;

export default albumCreatorSlice.reducer;
