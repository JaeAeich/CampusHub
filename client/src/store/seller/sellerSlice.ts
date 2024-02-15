import { createSlice } from '@reduxjs/toolkit';

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    sellerId: '',
    sellerAuth: false,
  },
  reducers: {
    setSellerId: (state, action) => {
      state.sellerId = action.payload;
    },
    sellerAuthenticated: (state) => {
      state.sellerAuth = true;
    },
    sellerUnauthenticated: (state) => {
      state.sellerAuth = false;
    },
  },
});

export const { setSellerId ,sellerAuthenticated, sellerUnauthenticated} = sellerSlice.actions;

export default sellerSlice.reducer;
