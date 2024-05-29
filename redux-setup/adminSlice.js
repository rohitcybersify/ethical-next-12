import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCount: {},
  recentProducts: [],
  recentCustomers: [],
  viewItem: false,
}

export const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getTotalCount: (state, action) => {
      state.totalCount = action.payload
    },
    setViewItem: (state, action) => {
      state.viewItem = action.payload
    },
    getRecentProducts: (state, action) => {
      state.recentProducts = action.payload
    },
    getRecentCustomers: (state, action) => {
      state.recentCustomers = action.payload
    },
    deleteCustomer: (state, action) => {
      const customerId = action.payload
      state.recentCustomers = state.recentCustomers.filter(
        (customer) => customer.id !== customerId
      )
    },
  },
})

export const {
  getTotalCount,
  getRecentProducts,
  getRecentCustomers,
  deleteCustomer,
  setViewItem,
} = AdminSlice.actions

export default AdminSlice.reducer
