import { ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { Toaster } from '@/components/ui/toaster';
import Product from '@/api/products/types';
// import { useToast } from './ui/use-toast';
// import { ToastAction } from './ui/toast';
import Stars from './Stars';

function ProductCard({ product }: { product: Product }) {
  const { product_id, product_images, product_name, rating, product_cost } = product;
  // const { toast } = useToast();
  return (
    <div className="relative inline-block m-7 w-full max-w-xs overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link key={product_id} to={`/products/${product_id}`} state={product}>
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
          <img className="object-cover" src={product_images[0]} alt="product" />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {/* //TODO: OFFER API CALL, TO CHECK IF THIS HAS ANY DISCOUNT */}
            39% OFF
          </span>
        </div>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link key={product_id} to={`/products/${product_id}`} state={product}>
          <div>
            <h5 className="text-lgg font-subheading tracking-tight text-primary">{product_name}</h5>
          </div>
        </Link>
        <Link key={product_id} to={`/products/${product_id}`} state={product}>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xll font-bold text-primary">&#8377;{product_cost}</span>
              {/* //TODO: OFFER API CALL, TO CHECK IF THIS HAS ANY DISCOUNT */}
              <span className="text-sm text-primary line-through">&#8377;699</span>
            </p>
            <div className="flex items-center">
              <Stars rating={rating} />
              <span className="mr-2 md:ml-3 rounded bg-secondaryLight md:px-2.5 md:py-0.5 px-1.5 py-0.5 text-xs font-semibold">
                {rating}
              </span>
            </div>
          </div>
        </Link>
        {/* <Toaster />
        {/* //TODO: Add onClick functionality */}
        <div
          // onMouseOver={() => {
          //   toast({
          //     title: 'Product Added Successfully',
          //     action: <ToastAction altText="Add to cart">View Cart</ToastAction>,
          //   });
          // }}
          // onFocus={() => {
          //   toast({
          //     title: 'Product Added Successfully',
          //     action: <ToastAction altText="Add to cart">View Cart</ToastAction>,
          //   });
          // }}
          className="w-full flex items-center justify-center rounded-md bg-accentLight px-5 py-2.5 text-center text-smm font-medium text-primary hover:bg-accent hover:text-background focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <ShoppingCartIcon className="mb-1 mr-2 h-7" />
          Add to cart
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
