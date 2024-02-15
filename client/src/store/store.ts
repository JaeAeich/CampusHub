import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice';
import sellerReducer from './seller/sellerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    seller: sellerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
