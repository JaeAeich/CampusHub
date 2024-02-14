import Cart, { CartItem } from '@/api/cart/types';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { getUserCart, updateUserCart } from '@/api/users/users';
import errorResponse from '@/utils/response';
import { AppDispatch } from '../store';

const initialState: Cart = {
  cart_id: '',
  carts: [],
};

type thePayload = {
  product_id: string;
  user_id: string;
};

export const cartSlice: Slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Cart>) => action.payload,
    add: (state, action: PayloadAction<thePayload>) => {
      const { user_id } = action.payload;
      const foundProduct = state.carts.find(
        (item: CartItem) => item.product_id === action.payload.product_id,
      );
      const quantity = foundProduct ? foundProduct.quantity + 1 : 1;
      const updatedCart: Cart = {
        ...state,
        carts: [
          ...state.carts,
          {
            product_id: action.payload.product_id,
            quantity,
          },
        ],
      };
      updateUserCart(user_id, updatedCart);
      return updatedCart;
    },
    remove: (state, action: PayloadAction<thePayload>) => {
      const { user_id } = action.payload;
      const foundProduct = state.carts.find(
        (item: CartItem) => item.product_id === action.payload.product_id,
      );
      const quantity = foundProduct ? foundProduct.quantity - 1 : 0;
      let updatedCart: Cart;
      if (quantity === 0) {
        updatedCart = {
          ...state,
          carts: state.carts.filter(
            (item: CartItem) => item.product_id !== action.payload.product_id,
          ),
        };
      } else {
        updatedCart = {
          ...state,
          carts: [
            ...state.carts,
            {
              product_id: action.payload.product_id,
              quantity,
            },
          ],
        };
      }
      updateUserCart(user_id, updatedCart);
      return updatedCart;
    },
    clear: (state) => ({
      ...state,
      carts: {},
    }),
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
  try {
    const cart = await getUserCart(user_id);
    if ('cart' in cart) {
      const cartData = cart.cart;
      if (cartData) {
        dispatch(set(cartData as Cart));
      } else {
        errorResponse('Invalid cart data received', 'store.cart.setCartDataAsync');
      }
    }
  } catch (error) {
    errorResponse(Error.toString(), 'store.cart.setCartDataAsync');
  }
};
