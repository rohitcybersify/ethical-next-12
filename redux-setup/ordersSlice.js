// idSlice.js

import { createSlice } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {
  selectedId: null,
  items: [],
  isEditable: false,
}

// Create a slice for managing the selected ID
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrders(state, action) {
      state.items.push(action.payload)
    },
    setSelectedEditId(state, action) {
      state.selectedId = action.payload
      state.isEditable = false
    },
    setSelectedViewId(state, action) {
      state.selectedId = action.payload
      state.isEditable = true
    },
    clearSelectedId(state) {
      state.selectedId = null
    },
  },
})

// Export actions and reducer
export const {
  addOrders,
  setSelectedEditId,
  setSelectedViewId,
  clearSelectedId,
} = ordersSlice.actions

export default ordersSlice.reducer
