interface Cart {
  cart_id: string;
  carts: CartItem[];
}

interface CartItem {
  product_id: string;
  quantity: number;
}

export default Cart;
