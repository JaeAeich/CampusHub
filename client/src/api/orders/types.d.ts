import { CartItem } from '../cart/types';

export default interface Order {
  amount_paid: number;
  created_at: string;
  delivery_address: string;
  delivery_status: boolean;
  email_id: string;
  product_list: CartItem[];
  seller_id: string;
  store_id: string;
  store_name: string;
  order_id: string;
  user_id: string;
}
