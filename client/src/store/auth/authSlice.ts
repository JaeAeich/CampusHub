import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
    sellerAuth: false,
    user_id: '',
  },
  reducers: {
    authenticated: (state, action) => {
      state.value = true;
      state.user_id = action.payload;
    },
    unauthenticated: (state) => {
      state.value = false;
      state.user_id = '';
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
