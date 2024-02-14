interface CartItem {
  product_id: string;
  quantity: number;
}

interface Cart {
  cart_id: string;
  carts: CartItem[];
}

export default Cart;
export type { CartItem };
