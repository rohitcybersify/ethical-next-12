import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  country: '',
  userCurrentCountry: null,
  countryCode: '',
}

export const CountrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      state.country = action.payload
    },
    checkCountryCode: (state, action) => {
      state.countryCode = action.payload
    },

    setUserCurrentCountry: (state, action) => {
      state.userCurrentCountry = action.payload
    },
  },
})

export const { selectCountry, setUserCurrentCountry, checkCountryCode } =
  CountrySlice.actions

export default CountrySlice.reducer
