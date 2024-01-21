export default interface Offers {
  offer_id: string;
  created_at: string;
  discount: number;
  product_ids: string[];
  service_id: string;
  store_id: string;
  validity_duration: number;
  // eslint-disable-next-line
}
