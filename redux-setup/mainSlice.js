// redux-set-up/mainSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  description: '',
};
const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});
export const { setTitle, setDescription } = mainSlice.actions;

export default mainSlice.reducer;
