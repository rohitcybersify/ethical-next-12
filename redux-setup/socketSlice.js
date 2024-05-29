import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  socket: null,
}

export const SocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload
    },
  },
})

export const { setSocket } = SocketSlice.actions

export default SocketSlice.reducer
