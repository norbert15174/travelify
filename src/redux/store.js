import { configureStore } from '@reduxjs/toolkit'
import blurSlice from "./blurSlice";
import deleteFriendSlice from "./deleteFriendSlice";
import userDataSlice from "./userDataSlice";
import albumDetailsSlice from './albumDetailsSlice';

export default configureStore({
    reducer: {
        blur: blurSlice,
        deleteFriend: deleteFriendSlice,
        userData: userDataSlice,
        albumDetails: albumDetailsSlice
    },
})