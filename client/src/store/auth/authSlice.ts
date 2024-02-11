import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
    sellerAuth: false,
  },
  reducers: {
    authenticated: (state) => {
      state.value = true;
    },
    unauthenticated: (state) => {
      state.value = false;
    },
    sellerAuthenticated: (state) => {
      state.sellerAuth = true;
    },
    sellerUnauthenticated: (state) => {
      state.sellerAuth = false;
    },
  },
});

export const { authenticated, unauthenticated, sellerAuthenticated, sellerUnauthenticated } =
  authSlice.actions;

export default authSlice.reducer;
