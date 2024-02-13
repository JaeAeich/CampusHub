import Cart, { CartItem } from '@/api/cart/types';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { getUserCart, updateUserCart } from '@/api/users/users';
import { omit, update } from 'lodash';
import { useSelector } from 'react-redux';

const initialState: Cart = {
  cart_id: '',
  carts: [],
};

type addPayload = {
  product_id: string;
  quantity: number;
  user_id: string;
};

export const cartSlice: Slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Cart>) => {
      console.log(action.payload);
      return action.payload;
    },
    add: (state, action: PayloadAction<addPayload>) => {
      const { user_id } = action.payload;
      console.log(user_id);
      console.log(action.payload);
      updateUserCart(user_id, {
        ...state,
        carts: {
          ...state.cart_items,
          [action.payload.product_id]: action.payload.quantity,
        },
      });
      return {
        ...state,
        carts: {
          ...state.cart_items,
          [action.payload.product_id]: action.payload.quantity,
        },
      };
    },
    remove: (state, action) => {
      const user_id = useSelector((state: RootState) => state.auth.user_email);
      updateUserCart(user_id, {
        ...state,
        carts: {
          ...state.cart_items,
          [action.payload.product_id]: action.payload.quantity,
        },
      });
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

/**
 * Adds a product to the cart.
 *
 * @param product_id The ID of the product to add to the cart.
 * @param quantity The quantity of the product to add to the cart.
 * @returns A thunk that dispatches the add action with the product data.
 */
