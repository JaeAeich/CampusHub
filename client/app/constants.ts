import Product from '@/api/products/types';
import Review from '@/api/reviews/types';
import Service from '../src/api/services/types';
import Store from '../src/api/stores/types';

export const services: Service[] = [
  {
    service_id: 'service1',
    service_categories: ['Food'],
    service_description: 'Delicious food options for every taste.',
    service_images: ['./services/food.png'],
    service_name: 'Food Service',
    store_ids: ['store1', 'store2'],
  },
  {
    service_id: 'service2',
    service_categories: ['Thrift Store'],
    service_description: 'Discover unique treasures at our thrift store.',
    service_images: ['./services/thrift-store.jpg'],
    service_name: 'Thrift Store',
    store_ids: ['store3', 'store4'],
  },
  {
    service_id: 'service3',
    service_categories: ['Electronics'],
    service_description: 'Explore the latest in electronic gadgets and devices.',
    service_images: ['./services/electronics.png'],
    service_name: 'Electronics Store',
    store_ids: ['store5', 'store6'],
  },
  {
    service_id: 'service4',
    service_categories: ['Laundry'],
    service_description: 'Professional laundry services for your convenience.',
    service_images: ['./services/laundry.jpg'],
    service_name: 'Laundry Service',
    store_ids: ['store7', 'store8'],
  },
  {
    service_id: 'service5',
    service_categories: ['Pharmacy'],
    service_description: 'Your trusted pharmacy for all your health needs.',
    service_images: ['./services/pharmacy.png'],
    service_name: 'Pharmacy',
    store_ids: ['store9', 'store10'],
  },
  {
    service_id: 'service6',
    service_categories: ['Stationery'],
    service_description: 'Quality stationery products for work and school.',
    service_images: ['./services/stationery.png'],
    service_name: 'Stationery Store',
    store_ids: ['store11', 'store12'],
  },
];

// TODO: OFFERS IS NOT COMPLIANT
export const deals: Array<{
  name: string;
  image: string;
  product_id: string;
  desc: string;
  originalCost: number;
  discountedCost: number;
}> = [
  {
    name: 'Crispy Masala Dosa',
    product_id: 'product5',
    image: './products/dosa.png',
    desc: 'A thin crisp pancake of indian origin, typically made from rice flour, stuffed with mashed potatoes and served with chutney.',
    originalCost: 50,
    discountedCost: 30,
  },
  {
    name: 'Elegant Laptop Cover',
    product_id: 'product6',
    image: './products/laptop-cover.png',
    desc: 'Introducing our premium laptop cover designed to offer the perfect blend of style and functionality. Crafted with precision, this sleek accessory is tailored to fit and protect your laptop, ensuring it stays safe from scratches, dings, and everyday wear and tear.',
    originalCost: 250,
    discountedCost: 99,
  },
];

export const stores: Store[] = [
  {
    store_id: 'store1',
    coordinates: [12.971598, 77.594562],
    customer_order_ids: ['order1', 'order2'],
    offer_available: true,
    overall_rating: 4.5,
    product_ids: ['product1', 'product2'],
    seller_id: 'seller1',
    service_id: 'service1',
    store_address: '123, Main Street',
    store_categories: ['Cafe', 'Restaurant'],
    store_description:
      'A popular cafe chain with delicious coffee options. A popular cafe chain with delicious coffee options. A popular cafe chain with delicious coffee options.A popular cafe chain with delicious coffee options.',
    store_email: 'ccd@example.com',
    store_images: ['/stores/ccd.png'],
    store_name: 'Cafe Coffee Day',
    store_phone_number: '9876543210',
    timings: [9, 21],
  },
  {
    store_id: 'store2',
    coordinates: [12.971598, 77.594562],
    customer_order_ids: ['order3', 'order4'],
    offer_available: false,
    overall_rating: 4.0,
    product_ids: ['product3', 'product4'],
    seller_id: 'seller2',
    service_id: 'service1',
    store_address: '456, Commercial Street',
    store_categories: ['Grocery', 'Dairy'],
    store_description: 'A popular store for dairy and grocery needs.',
    store_email: 'amul@store.com',
    store_images: ['/stores/amul.jpg'],
    store_name: 'Amul Store',
    store_phone_number: '9876543211',
    timings: [10, 20],
  },
];

export const products: Product[] = [
  {
  product_id: 'product11',
    offer_id: 'offer11',
    product_categories: [ 'Pharmacy' ],
    product_description: 'Moisturizing lotion for soft and hydrated skin.',
    product_images: [ '/products/moisturizer.jpg' ],
    product_name: 'Hydrating Moisturizer',
    product_cost: 15,
    stock: 150,
    store_id: 'store6',
    product_specifications: { size: '200ml', brand: 'SkinCarePlus' },
    service_id: 'service5',
    rating: 4.8,},
  {
    product_id: 'product12',
    offer_id: 'offer12',
    product_categories: [ 'Stationery' ],
    product_description: 'High-quality ballpoint pens for smooth writing.',
    product_images: [ '/products/pens.jpg' ],
    product_name: 'Ballpoint Pens',
    product_cost: 5,
    stock: 200,
    store_id: 'store7',
    product_specifications: { size: 'Pack of 5', brand: 'WriteRight' },
    service_id: 'service6',
    rating: 4.6,
  },
  {
    product_id: 'product3',
    offer_id: 'offer3',
    product_categories: [ 'Food', 'Beverages' ],
    product_description: 'A thin crisp pancake of Indian origin, typically made from rice flour, stuffed with mashed potatoes and served with chutney.',
    product_images: [ '/products/dosa.png' ],
    product_name: 'Crispy Masala Dosa',
    product_cost: 50,
    stock: 100,
    store_id: 'store2',
    product_specifications: { size: 'Regular', brand: 'Local Kitchen' },
    service_id: 'service1',
    rating: 4.8
  },
  {
    product_id: 'product7',
    offer_id: 'offer7',
    product_categories: [ 'Electronics' ],
    product_description: 'High-quality wireless headphones for an immersive audio experience.',
    product_images: [ '/products/headphones.png' ],
    product_name: 'Wireless Headphones',
    product_cost: 120,
    stock: 50,
    store_id: 'store4',
    product_specifications: { size: 'One Size', brand: 'TechZone' },
    service_id: 'service3',
    rating: 4.5,
  },
  {
    product_id: 'products_B3h7VH2LZWaXefwCBPXjnV',
    product_categories: [ 'fast food' ],
    product_name: 'Burger',
    store_id: 'stores_G6w2tPiTGTzYFugocuDEuw',
    service_id: '',
    product_images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    product_cost: 100,
    product_description: 'Health Drink that has nutrients to support immunity. Horlicks is clinically proven to improve 5 signs of growth. Clinically proven to make kids Taller, Stronger & Sharper. Scientifically proven to improve the Power of Milk.',
    stock: 100,
    product_specifications: {
      Brand: 'HORLICKS',
      'Model Name': 'CLASSIC MALT 500G',
      Quantity: '500 g',
      'Container Type': 'Plastic Bottle',
      Flavor: 'Classic Malt',
      'Maximum Shelf Life': '12 Months',
      Ingredients: 'NA',
      'Nutrient Content': 'NA',
      'Net Quantity': '500 g'
    },
    offer_id: '',
    rating: 0
  },
];

export const reviews: Review[] = [
  {
    product_id: 'product1',
    reviews: [
      {
        comment: 'Great coffee!',
        comment_headline: 'Great coffee!',
        rating: 5,
        review_images: ['./products/coffee.png'],
        user_id: 'user1',
      },
      {
        comment: 'Great coffee!',
        comment_headline: 'Great coffee!',
        rating: 5,
        review_images: ['./products/coffee.png'],
        user_id: 'user2',
      },
    ],
    store_id: 'store1',
  },
  {
    product_id: 'product2',
    reviews: [
      {
        comment: 'Great tea!',
        comment_headline: 'Great tea!',
        rating: 5,
        review_images: ['./products/tea.png'],
        user_id: 'user1',
      },
      {
        comment: 'Great tea!',
        comment_headline: 'Great tea!',
        rating: 5,
        review_images: ['./products/tea.png'],
        user_id: 'user2',
      },
    ],
    store_id: 'store1',
  },
  {
    product_id: 'product3',
    reviews: [
      {
        comment: 'Great milk!',
        comment_headline: 'Great milk!',
        rating: 5,
        review_images: ['./products/milk.png'],
        user_id: 'user1',
      },
      {
        comment: 'Great milk!',
        comment_headline: 'Great milk!',
        rating: 5,
        review_images: ['./products/milk.png'],
        user_id: 'user2',
      },
    ],
    store_id: 'store2',
  },
  {
    product_id: 'product4',
    reviews: [
      {
        comment: 'Great cheese!',
        comment_headline: 'Great cheese!',
        rating: 5,
        review_images: ['./products/cheese.png'],
        user_id: 'user1',
      },
      {
        comment: 'Great cheese!',
        comment_headline: 'Great cheese!',
        rating: 5,
        review_images: ['./products/cheese.png'],
        user_id: 'user2',
      },
    ],
    store_id: 'store2',
  },
];
