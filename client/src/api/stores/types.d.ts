export default interface Store {
  store_id: string;
  coordinates: [number, number];
  customer_order_ids: string[];
  offer_available: boolean;
  overall_rating: number;
  product_ids: string[];
  seller_id: string;
  service_id: string;
  store_address: string;
  store_categories: string[];
  store_description: string;
  store_email: string;
  store_images: string[];
  store_name: string;
  store_phone_number: string;
  stripe_public_key: string;
  timings: [number, number];
}

export interface StoreList{
  sellers: Store[];
}