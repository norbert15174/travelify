import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
      setUserId: (state, action) => {
        state.id = action.payload;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setUserId } = userDataSlice.actions
  
  export default userDataSlice.reducer;