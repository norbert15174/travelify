import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    owner: null,
    rights: "",
    albumType: "",
    sharedPersonList: null,
    albumPhotos: [],
    friendsList: null,
    info: null,
};

export const albumDetailsSlice = createSlice({
  name: "albumDetails",
  initialState: initialState,
  reducers: {
        setOwner: (state, action) => {
            state.owner = action.payload;
        },
        setRights: (state, action) => {
            state.rights = action.payload;
        },
        setAlbumType: (state, action) => {
            state.albumType = action.payload;
        }, 
        setSharedPersonList: (state, action) => {
            state.sharedPersonList = action.payload;
        },
        setAlbumPhotos: (state, action) => {
            state.albumPhotos = action.payload;
        },
        setInfo: (state, action) => {
            state.info = action.payload;
        },
        clearStore: (state) => {
            state.info = null;
            state.albumPhotos = [];
            state.sharedPersonList = null;
            state.rights = "";
            state.albumType = "";
            state.owner = null;
        },
        setFriendsList: (state, action) => {
            state.friendsList = action.payload;
        },
        updateComments: (state, action) => {
            // let arr = [objects...] i iterować i modyfikować
            // będę musiał przesłać id zdjęcia
        },
        updateTaggedPersonList: (state, action) => {
            // let arr = [objects...] i iterować i modyfikować
        },
        updateDescription: (state, action) => {
             // let arr = [objects...] i iterować i modyfikować
        }
  },
});

// actions
export const { setOwner, setRights, setAlbumType, setSharedPersonList, setAlbumPhotos, setInfo, setFriendsList, clearStore } = albumDetailsSlice.actions;

// exporting selects
export const selectInfo = (state) => state.albumDetails.info;
export const selectOwner = (state) => state.albumDetails.owner;
export const selectSharedPersonList = (state) => state.albumDetails.sharedPersonList;
export const selectAlbumPhotos = (state) => state.albumDetails.albumPhotos;
export const selectRights = (state) => state.albumDetails.rights;
export const selectAlbumType = (state) => state.albumDetails.albumType;
export const selectFriendsList = (state) => state.albumDetails.friendsList;

export default albumDetailsSlice.reducer;
