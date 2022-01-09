import { configureStore } from "@reduxjs/toolkit";
import blurSlice from "./blurSlice";
import deleteFriendSlice from "./deleteFriendSlice";
import userDataSlice from "./userDataSlice";
import albumDetailsSlice from "./albumDetailsSlice";
import albumCreatorSlice from "./albumCreatorSlice";
import groupCreatorSlice from "./groupCreatorSlice";
import groupDetailsSlice from "./groupDetailsSlice";
import groupAlbumDetailsSlice from "./groupAlbumSlice";
import groupAlbumCreatorSlice from "./groupAlbumCreatorSlice";
import notificationSlice from "./notificationSlice";

export default configureStore({
  reducer: {
    blur: blurSlice,
    deleteFriend: deleteFriendSlice,
    userData: userDataSlice,
    albumDetails: albumDetailsSlice,
    albumCreator: albumCreatorSlice,
    groupCreator: groupCreatorSlice,
    groupDetails: groupDetailsSlice,
    groupAlbumDetails: groupAlbumDetailsSlice,
    groupAlbumCreator: groupAlbumCreatorSlice,
    notification: notificationSlice,
  },
});

