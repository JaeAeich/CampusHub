export const services: Array<{ name: string; image: string }> = [
  { name: 'Food', image: './services/food.png' },
  { name: 'Thrift Store', image: './services/thrift-store.jpg' },
  { name: 'Electronics', image: './services/electronics.png' },
  { name: 'Laundry', image: './services/laundry.jpg' },
  { name: 'Pharmacy', image: './services/pharmacy.png' },
  { name: 'Stationery', image: './services/stationery.png' },
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
