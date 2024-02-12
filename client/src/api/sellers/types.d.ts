export default interface Seller {
  seller_id: string;
  seller_address: string;
  seller_email: string;
  seller_gender: 'Male' | 'Female' | 'Other';
  seller_image: string;
  seller_name: string;
  seller_phone_number: string;
  store_ids: string[];
}

export interface SellerList {
  sellers: Seller[];
}
