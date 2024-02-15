import Cart, { CartItem } from '@/api/cart/types';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { getUserCart, updateUserCart } from '@/api/users/users';
import errorResponse from '@/utils/response';
import { AppDispatch, RootState } from '../store';

type thePayload = {
  product_id: string;
  user_id: string;
};

export const cartSlice: Slice = createSlice({
  name: 'cart',
  initialState: {
    cart_id: '',
    carts: [],
  } as Cart,
  reducers: {
    set: (_state, action: PayloadAction<Cart>) => action.payload,
    add: (state, action: PayloadAction<thePayload>) => {
      const foundProduct = state.carts.find(
        (item: CartItem) => item.product_id === action.payload.product_id,
      );
      const quantity = foundProduct ? foundProduct.quantity + 1 : 1;
      const updatedCart: Cart = {
        ...state,
        carts: state.carts.filter(
          (item: CartItem) => item.product_id !== action.payload.product_id,
        ),
      };
      updatedCart.carts.push({
        product_id: action.payload.product_id,
        quantity,
      });
      return updatedCart;
    },
    remove: (state, action: PayloadAction<thePayload>) => {
      const foundProduct = state.carts.find(
        (item: CartItem) => item.product_id === action.payload.product_id,
      );
      const quantity = foundProduct ? foundProduct.quantity - 1 : 0;
      const updatedCart: Cart = {
        ...state,
        carts: state.carts.filter(
          (item: CartItem) => item.product_id !== action.payload.product_id,
        ),
      };
      if (quantity > 0) {
        updatedCart.carts.push({
          product_id: action.payload.product_id,
          quantity,
        });
      }
      return updatedCart;
    },
    removeProduct:(state, action: PayloadAction<thePayload>) => {
      const updatedCart: Cart = {
        ...state,
        carts: state.carts.filter(
          (item: CartItem) => item.product_id !== action.payload.product_id,
        ),
      };
      return updatedCart;
    },
    clear: (state) => ({
      ...state,
      carts: {},
    }),
  },
});

export const { set, add, remove, removeProduct, clear } = cartSlice.actions;

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

/**
 * updates the cart.
 *
 * @param user_id The user ID to add the product to.
 * @param cart The product ID to add to the cart.
 * @returns A thunk that dispatches the add action with the product ID.
 */
export const addProductToCartAsync =
  (product_id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(add({ product_id }));
      const { user_id } = getState().auth;
      const { cart } = getState();
      await updateUserCart(user_id, cart);
    } catch (error) {
      errorResponse(Error.toString(), 'store.cart.addProductToCartAsync');
    }
  };

export const removeProductFromCartAsync =
  (product_id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(remove({ product_id }));
      const { user_id } = getState().auth;
      const { cart } = getState();
      await updateUserCart(user_id, cart);
    } catch (error) {
      errorResponse(Error.toString(), 'store.cart.addProductToCartAsync');
    }
  };

export const removeProductAsync = 
  (product_id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(removeProduct({ product_id }));
      const { user_id } = getState().auth;
      const { cart } = getState();
      await updateUserCart(user_id, cart);
    } catch (error) {
      errorResponse(Error.toString(), 'store.cart.removeProductAsync');
    }
  };