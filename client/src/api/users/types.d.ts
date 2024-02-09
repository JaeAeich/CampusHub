export default interface User {
user_id: string;
    user_name: string;
    user_phone_number: string;
    user_email: string;
    user_gender: 'Male' | 'Female' | 'Other';
    order_ids: string[];
    user_image: string
    user_address: string;
    cart_id: string;
    wishlist_cart_id: string;
}

  