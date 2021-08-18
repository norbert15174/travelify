import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  countries: null,
}

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: initialState,
    reducers: {
      addCountries: (state, action) => {
        state.countries = action.payload;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { addCountries } = countriesSlice.actions
  
  export default countriesSlice.reducer