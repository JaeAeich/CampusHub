export default interface Review {
  product_id: string;
  reviews: {
    comment: string;
    comment_headline: string;
    rating: number;
    review_images: string[];
    user_id: string;
  }[];
  store_id: string;
}
