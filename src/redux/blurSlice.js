import { createSlice } from '@reduxjs/toolkit'

// toggle blur when modal shows up

export const blurSlice = createSlice({
  name: 'blur',
  initialState: {
    value: false,
  },
  reducers: {
    toggleBlur: (state) => {
      state.value = !state.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleBlur } = blurSlice.actions

export default blurSlice.reducer