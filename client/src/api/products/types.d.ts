export default interface Product {
  product_id: string;
  offer_id: string;
  product_categories: string[];
  product_cost: number;
  product_description: string;
  product_images: string[];
  product_name: string;
  product_specifications: {
    [key: string]: string;
  };
  service_id: string;
  stock: number;
  store_id: string;
  rating: number;
}
