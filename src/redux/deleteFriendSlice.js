import { createSlice } from '@reduxjs/toolkit'

// id of a Friend we want to delete will be set here

export const deleteFriendSlice = createSlice({
  name: 'deleteFriend',
  initialState: {
    idToDelete: null,
  },
  reducers: {
    setFriendToDeleteId: (state, action) => {
      state.idToDelete = action.payload;
    },
  },
})

// actions
export const { setFriendToDeleteId } = deleteFriendSlice.actions

// selects
export const selectFriendToDeleteId = (state) => state.deleteFriend.idToDelete;

export default deleteFriendSlice.reducer;