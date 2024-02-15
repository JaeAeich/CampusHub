import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
    sellerAuth: false,
    user_id: '',
    userEmail: '',
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
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

export const { authenticated, unauthenticated, setUserEmail } = authSlice.actions;

export default authSlice.reducer;
