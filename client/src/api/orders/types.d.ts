export default interface Order {
  amount_paid: number;
  created_at: string;
  delivery_address: string;
  delivery_status: boolean;
  email_id: string;
  order_id: string;
  product_list: {
    product_id: string;
    offer_id: string;
    product_categories: string[];
    product_cost: number;
    product_description: string;
    product_image: string[];
    product_name: string;
    product_specifications: {
      [key: string]: string;
    };
    service_id: string;
    stocks: number;
    store_id: string;
  }[];
  seller_id: string;
  store_id: string;
  store_name: string;
  transaction_id: string;
  user_id: string;
}
