import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
    userEmail: '',
  },
  reducers: {
    authenticated: (state) => {
      state.value = true;
    },
    unauthenticated: (state) => {
      state.value = false;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

export const { authenticated, unauthenticated, setUserEmail } = authSlice.actions;

export default authSlice.reducer;
