import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice';
import sellerReducer from './seller/sellerSlice';
import notificationSlice from './notification/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    seller: sellerReducer,
    Notification: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
