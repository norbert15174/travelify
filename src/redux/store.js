import { configureStore } from '@reduxjs/toolkit'
import blurSlice from "./blurSlice";
import deleteFriendSlice from "./deleteFriendSlice";
import userDataSlice from "./userDataSlice";
import albumDetailsSlice from './albumDetailsSlice';
import albumCreatorSlice from './albumCreatorSlice';
import groupCreatorSlice from "./groupCreatorSlice";
import groupDetailsSlice from './groupDetailsSlice';

export default configureStore({
    reducer: {
        blur: blurSlice,
        deleteFriend: deleteFriendSlice,
        userData: userDataSlice,
        albumDetails: albumDetailsSlice,
        albumCreator: albumCreatorSlice,
        groupCreator: groupCreatorSlice,
        groupDetails: groupDetailsSlice
    },
})