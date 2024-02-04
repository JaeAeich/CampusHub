import Product from '@/api/products/types';
import ProductCard from './ProductCard';
import { products } from '../../app/constants';

function Wishlist() {
  return (
    <div className="lg:pt-10 pt-2">
      <div className="mx-auto flex items-center xl:justify-start justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          {/* //TODO: Fetch wishlist of user */}
          {products.map((prod: Product) => (
            <ProductCard key={prod.product_id} product={prod} wishlisted />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
