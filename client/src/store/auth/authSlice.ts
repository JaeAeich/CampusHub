import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
  },
  reducers: {
    authenticated: (state) => {
      state.value = true;
    },
    unauthenticated: (state) => {
      state.value = false;
    },
  },
});

export const { authenticated, unauthenticated } = authSlice.actions;

export default authSlice.reducer;
