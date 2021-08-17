import { createSlice } from '@reduxjs/toolkit'

// id of a Friend we want to delete will be set here

export const deleteFriendSlice = createSlice({
  name: 'deleteFriend',
  initialState: {
    value: null,
  },
  reducers: {
    setFriendToDeleteId: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFriendToDeleteId } = deleteFriendSlice.actions

export default deleteFriendSlice.reducer