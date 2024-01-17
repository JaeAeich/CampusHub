export const services: Array<{ name: string; image: string }> = [
  { name: 'Food', image: './images/food.png' },
  { name: 'Electronics', image: './images/electronics.png' },
  { name: 'Laundry', image: './images/laundry.jpg' },
  { name: 'Pharmacy', image: './images/pharmacy.png' },
  { name: 'Stationery', image: './images/stationery.png' },
  { name: 'Thrift Store', image: './images/thrift-store.png' },
];

export const categories: Array<{ name: string; image: string; quantity: number }> = [
  { name: 'Dress & frock', image: './images/icons/dress.svg', quantity: 53 },
  { name: 'Winter wear', image: './images/icons/coat.svg', quantity: 58 },
  { name: 'Glasses & lens', image: './images/icons/glasses.svg', quantity: 68 },
  { name: 'Shorts & jeans', image: './images/icons/shorts.svg', quantity: 84 },
  { name: 'T-shirts', image: './images/icons/tee.svg', quantity: 35 },
  { name: 'Jacket', image: './images/icons/jacket.svg', quantity: 16 },
  { name: 'Watch', image: './images/icons/watch.svg', quantity: 27 },
  { name: 'Hat & caps', image: './images/icons/hats.svg', quantity: 28 },
];

export const products: Array<{
  id: number;
  category: string;
  title: string;
  images: Array<string>;
  badge: string;
  price: number;
  discountedPrice: number;
  rating: number;
}> = [
  {
    id: 1,
    category: 'jacket',
    title: 'Mens Winter Leathers Jackets',
    images: ['./images/products/jacket-3.jpg', './images/products/jacket-4.jpg'],
    badge: '15%',
    price: 48.0,
    discountedPrice: 75.0,
    rating: 3,
  },
  {
    id: 2,
    category: 'shirt',
    title: 'Pure Garment Dyed Cotton Shirt',
    images: ['./images/products/shirt-1.jpg', './images/products/shirt-2.jpg'],
    badge: 'sale',
    price: 45.0,
    discountedPrice: 56.0,
    rating: 4,
  },
  {
    id: 3,
    category: 'skirt',
    title: 'Black Floral Wrap Midi Skirt',
    images: ['./images/products/clothes-3.jpg', './images/products/clothes-4.jpg'],
    badge: 'new',
    price: 25.0,
    discountedPrice: 35.0,
    rating: 5,
  },
];


export const miniProducts: Array<{
  imgSrc: string;
  category: string;
  title: string;
  alt: string;
  price: string;
  discount: string;
}> = [
    { imgSrc: "./images/products/clothes-1.jpg", alt: "relaxed short full sleeve t-shirt", title: "Relaxed Short full Sleeve T-Shirt", category: "Clothes", price: "$45.00", discount: "$12.00" },
    { imgSrc: "./images/products/clothes-2.jpg", alt: "girls pink embro design top", title: "Girls pnk Embro design Top", category: "Clothes", price: "$61.00", discount: "$9.00" },
    { imgSrc: "./images/products/clothes-3.jpg", alt: "black floral wrap midi skirt", title: "Black Floral Wrap Midi Skirt", category: "Clothes", price: "$76.00", discount: "$25.00" },
  ];