// redux-set-up/mainSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  description: '',
};
const contactSlice = createSlice({
  name: 'contact',
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
export const { setTitle, setDescription } = contactSlice.actions;

export default contactSlice.reducer;
