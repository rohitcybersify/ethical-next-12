import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: '',
  userEmail: '',
  userName: '',
  currentPage: null,
  userId: null,
  cartId: null,
  verifyToken: null,
  billingCart: false,
  registerCart: {
    name: '',
    lastName: '',
    email: '',
    phone_number: '',
    companyName: '',
    password: '',
    c_password: '',
  },
  otherInfo: {
    date: '',
    textarea: '',
    swagPack: false,
    Warehousing: false,
    graphicDesign: false,
    pickAndPack: false,
    notSure: false,
  },
  shippingCart: {
    singleAddress: '',
    country: '',
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    companyName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pin: '',
    terms: false,
    currency: '',
  },
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload
    },
    setBillingCart: (state, action) => {
      state.billingCart = action.payload
    },
    setCartId: (state, action) => {
      state.cartId = action.payload
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setuserId: (state, action) => {
      state.userId = action.payload
    },
    setVerifyToken: (state, action) => {
      state.verifyToken = action.payload
    },
    setRegisterCart: (state, action) => {
      state.registerCart = { ...state.registerCart, ...action.payload }
    },
    setOtherInfo: (state, action) => {
      state.otherInfo = { ...state.otherInfo, ...action.payload }
    },
    setShippingCart: (state, action) => {
      state.shippingCart = { ...state.shippingCart, ...action.payload }
    },
    resetRegisterCart: (state, action) => {
      state.registerCart = initialState.registerCart
    },
    resetOtherInfo: (state, action) => {
      state.otherInfo = initialState.otherInfo
    },
    resetShippingCart: (state, action) => {
      state.shippingCart = initialState.shippingCart
    },
  },
})

export const {
  setRole,
  setCurrentPage,
  setUserName,
  setuserId,
  setVerifyToken,
  setUserEmail,
  setRegisterCart,
  setBillingCart,
  resetRegisterCart,
  resetOtherInfo,
  resetShippingCart,
  setCartId,
  setOtherInfo,
  setShippingCart,
} = AuthSlice.actions

export default AuthSlice.reducer
