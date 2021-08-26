import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  countries: null,
}

export const countriesSlice = createSlice({
    name: 'countryList',
    initialState: initialState,
    reducers: {
      addCountries: (state, action) => {
        state.countries = action.payload;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { addCountries } = countriesSlice.actions
  export const getCountries = (state) => state.countryList.countries;
  
  export default countriesSlice.reducer