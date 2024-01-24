import Service from '../src/api/services/types'; // Update the path accordingly
import Store from '../src/api/stores/types'; // Update the path accordingly

export const services: Service[] = [
  {
    service_id: '1',
    service_categories: ['Food'],
    service_description: 'Delicious food options for every taste.',
    service_images: ['./services/food.png'],
    service_name: 'Food Service',
    store_ids: ['store1', 'store2'],
  },
  {
    service_id: '2',
    service_categories: ['Thrift Store'],
    service_description: 'Discover unique treasures at our thrift store.',
    service_images: ['./services/thrift-store.jpg'],
    service_name: 'Thrift Store',
    store_ids: ['store3', 'store4'],
  },
  {
    service_id: '3',
    service_categories: ['Electronics'],
    service_description: 'Explore the latest in electronic gadgets and devices.',
    service_images: ['./services/electronics.png'],
    service_name: 'Electronics Store',
    store_ids: ['store5', 'store6'],
  },
  {
    service_id: '4',
    service_categories: ['Laundry'],
    service_description: 'Professional laundry services for your convenience.',
    service_images: ['./services/laundry.jpg'],
    service_name: 'Laundry Service',
    store_ids: ['store7', 'store8'],
  },
  {
    service_id: '5',
    service_categories: ['Pharmacy'],
    service_description: 'Your trusted pharmacy for all your health needs.',
    service_images: ['./services/pharmacy.png'],
    service_name: 'Pharmacy',
    store_ids: ['store9', 'store10'],
  },
  {
    service_id: '6',
    service_categories: ['Stationery'],
    service_description: 'Quality stationery products for work and school.',
    service_images: ['./services/stationery.png'],
    service_name: 'Stationery Store',
    store_ids: ['store11', 'store12'],
  },
];

export const deals: Array<{
  name: string;
  image: string;
  desc: string;
  originalCost: number;
  discountedCost: number;
}> = [
  {
    name: 'Crispy Masala Dosa',
    image: './products/dosa.png',
    desc: 'A thin crisp pancake of indian origin, typically made from rice flour, stuffed with mashed potatoes and served with chutney.',
    originalCost: 50,
    discountedCost: 30,
  },
  {
    name: 'Elegant Laptop Cover',
    image: './products/laptop-cover.png',
    desc: 'Introducing our premium laptop cover designed to offer the perfect blend of style and functionality. Crafted with precision, this sleek accessory is tailored to fit and protect your laptop, ensuring it stays safe from scratches, dings, and everyday wear and tear.',
    originalCost: 250,
    discountedCost: 99,
  },
];

export const stores: Store[] = [
  {
    store_id: '1',
    coordinates: [12.971598, 77.594562],
    customer_order_ids: ['order1', 'order2'],
    offer_available: true,
    overall_rating: 4.5,
    product_ids: ['product1', 'product2'],
    seller_id: 'seller1',
    service_id: 'service1',
    store_address: '123, Main Street',
    store_categories: ['Cafe', 'Restaurant'],
    store_description: 'A popular cafe chain with delicious coffee options.',
    store_email: 'ccd@example.com',
    store_images: ['./ccd.png', './ccd.png'],
    store_name: 'Cafe Coffee Day',
    store_phone_number: '9876543210',
    stripe_public_key: 'your_stripe_public_key',
    timings: [9, 21],
  },
  {
    store_id: '2',
    coordinates: [12.971598, 77.594562],
    customer_order_ids: ['order3', 'order4'],
    offer_available: false,
    overall_rating: 4.0,
    product_ids: ['product3', 'product4'],
    seller_id: 'seller2',
    service_id: 'service2',
    store_address: '456, Commercial Street',
    store_categories: ['Grocery', 'Dairy'],
    store_description: 'A popular store for dairy and grocery needs.',
    store_email: 'amul@store.com',
    store_images: ['./amul.jpg', './amul.jpg'],
    store_name: 'Amul Store',
    store_phone_number: '9876543211',
    stripe_public_key: 'your_stripe_public_key',
    timings: [10, 20],
  },
];
