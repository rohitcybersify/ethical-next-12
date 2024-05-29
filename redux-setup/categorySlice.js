import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  getProductsRes: null,
  getProductsLoading: null,
  getProductsError: null,
  allCategories: {},
  subCategoryOnTop: [],
  collectionForUrl: '',
  subCollectionForUrl: '',
  productID: '',
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getAllCategories: (state, action) => {
      state.allCategories = action.payload
    },
    setProductID: (state, action) => {
      state.productID = action.payload
    },

    setSubCategoryOnTop: (state, action) => {
      state.subCategoryOnTop = action.payload
    },

    setCollectionForUrl: (state, action) => {
      state.collectionForUrl = action.payload
    },
    setSubCollectionForUrl: (state, action) => {
      state.subCollectionForUrl = action.payload
    },
    setProductsRes: (state, action) => {
      state.getProductsRes = action.payload
    },
    setProductsLoading: (state, action) => {
      state.getProductsLoading = action.payload
    },
    setProductsError: (state, action) => {
      state.getProductsError = action.payload
    },
  },
})

export const {
  getAllCategories,
  setSubCategoryOnTop,
  setCollectionForUrl,
  setSubCollectionForUrl,
  setProductsRes,
  setProductsLoading,
  setProductsError,
  setProductID,
} = categorySlice.actions

export default categorySlice.reducer
