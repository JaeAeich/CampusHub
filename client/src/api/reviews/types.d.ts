export interface Review {
  comment: string;
  comment_headline: string;
  rating: number;
  review_images: string[];
  user_id: string;
}

export default interface ReviewList {
  product_id: string;
  reviews: Review[];
  store_id: string;
}
