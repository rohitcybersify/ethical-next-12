import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeLink: 'Dashbaord',
}

export const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveLink: (state, action) => {
      state.activeLink = action.payload
    },
  },
})

export const { setActiveLink } = SidebarSlice.actions

export default SidebarSlice.reducer
