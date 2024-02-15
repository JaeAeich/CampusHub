import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import sellerReducer from './seller/sellerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    seller: sellerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
