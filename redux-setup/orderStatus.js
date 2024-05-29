import { createSlice } from '@reduxjs/toolkit'
export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    submitted: false,
    approved: false,
    payment: false,
    production: false,
    shipping: false,
    delivered: false,
    orderNumber: '',
    orderId: '',
    productStatus: '',
  },
  reducers: {
    updateStatus: (state, action) => {
      state[action.payload] = true
    },
    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload
    },
    setProductStatus: (state, action) => {
      state.productStatus = action.payload
    },

    clearStatus: (state, action) => {
      state[action.payload] = false
    },
  },
})
export const {
  updateStatus,
  setOrderNumber,
  setOrderId,
  setProductStatus,
  clearStatus,
} = statusSlice.actions
export default statusSlice.reducer
