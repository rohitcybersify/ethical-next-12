import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFilters: {},
  showAllFilters: [],
  colorsObj: {},
  swiftSwag: '',
  date: null,
}

export const FiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAllFilters: (state, action) => {
      state.allFilters = action.payload
    },
    setShowAllFilters: (state, action) => {
      state.showAllFilters = action.payload
    },
    setColorsObj: (state, action) => {
      state.colorsObj = action.payload
    },
    setSwiftSwag: (state, action) => {
      state.swiftSwag = action.payload
    },
    setDate: (state, action) => {
      state.date = action.payload
    },
  },
})

export const {
  setAllFilters,
  setShowAllFilters,
  setColorsObj,
  setSwiftSwag,
  setDate,
} = FiltersSlice.actions
export default FiltersSlice.reducer
