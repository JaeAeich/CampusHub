import Cart from '@/api/cart/types';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { getUserCart } from '@/api/users/users';
import { omit } from 'lodash';

const initialState: Cart = {
  cart_id: '',
  carts: [],
};

export const cartSlice: Slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Cart>) => {
      return action.payload;
    },
    add: (state, action) => {
      return {
        ...state,
        carts: {
          ...state.cart_items,
          [action.payload.product_id]: action.payload.quantity,
        },
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        carts: omit(state.cart_items, action.payload.product_id),
      };
    },
    clear: (state) => {
      return {
        ...state,
        carts: {},
      };
    },
  },
});

export const { set, add, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;

/**
 * Fetches the cart data of the user from the server.
 *
 * @param user_id The user ID to fetch the cart data for.
 * @returns A thunk that dispatches the set action with the cart data.
 */
export const setCartDataAsync = (user_id: string) => async (dispatch: AppDispatch) => {
  console.log(user_id);
  try {
    const cart = await getUserCart(user_id);
    if ('cart' in cart) {
      const cartData = cart.cart;
      if (cartData) {
        dispatch(set(cartData as Cart));
      } else {
        console.error('Invalid cart data received:', cartData);
      }
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};
