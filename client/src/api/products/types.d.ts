export default interface Product {
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
}
