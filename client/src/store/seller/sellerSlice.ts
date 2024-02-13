import { createSlice } from '@reduxjs/toolkit';

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    sellerId: '',
  },
  reducers: {
    setSellerId: (state, action) => {
      state.sellerId = action.payload;
    },
  },
});

export const { setSellerId } = sellerSlice.actions;

export default sellerSlice.reducer;
