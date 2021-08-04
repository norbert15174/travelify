import { configureStore } from '@reduxjs/toolkit'
import blurSlice from "./blurSlice";
import deleteFriendSlice from "./deleteFriendSlice";

export default configureStore({
    reducer: {
        blur: blurSlice,
        deleteFriend: deleteFriendSlice,
    },
})