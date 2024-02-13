import { ShoppingCartIcon, Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '@/api/products/types';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Stars from './Stars';

function ProductCard({ product, wishlisted }: { product: Product; wishlisted: boolean }) {
  const { product_id, product_images, product_name, rating, product_cost, store_id } = product;
  const [fillColor, setFillColor] = useState('#fff');
  const [strokeColor, setStrokeColor] = useState('#000');

  const mouseIn = () => {
    if (!wishlisted) {
      setFillColor('#e89ba1');
      setStrokeColor('#e89ba1');
    }
  };
  const mouseOut = () => {
    if (!wishlisted) {
      setFillColor('#fff');
      setStrokeColor('#000');
    }
  };

  const { toast } = useToast();
  return (
    <div className="relative max-h-108 inline-block m-4 w-full max-w-xs overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        {/* //TODO: Apply onClick for posting to user's wishlist */}
        <Heart
          color={wishlisted ? '#e89ba1' : strokeColor}
          fill={wishlisted ? '#e89ba1' : fillColor}
          onMouseOver={mouseIn}
          onMouseOut={mouseOut}
          size="35"
          className="absolute top-0 right-0 ml-2 pl-2"
        />
        <img className="object-cover w-full h-full" src={product_images[0]} alt="product" />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          {/* //TODO: OFFER API CALL, TO CHECK IF THIS HAS ANY DISCOUNT */}
          39% OFF
        </span>
      </div>

      <div className="mt-4 md:px-5 md:pb-5 pb-3 px-5 ">
        <Link key={product_id} to={`/stores/${store_id}/products/${product_id}`} state={product}>
          <div>
            <h5 className="md:text-lgg text-lg font-subheading tracking-tight text-primary">
              {product_name}
            </h5>
          </div>
        </Link>
        <Link key={product_id} to={`/stores/${store_id}/products/${product_id}`} state={product}>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="md:text-xll text-xl font-bold text-primary">
                &#8377;{product_cost}
              </span>
              {/* //TODO: OFFER API CALL, TO CHECK IF THIS HAS ANY DISCOUNT */}
              <span className="text-sm text-primary line-through">&#8377;699</span>
            </p>
            <div className="flex items-center overflow-hidden">
              <Stars rating={rating} />
              <span className="mr-1 md:ml-1 rounded bg-secondaryLight md:px-1 md:py-0.5 px-1.5 py-0.5 text-xs font-semibold">
                {rating}
              </span>
            </div>
          </div>
        </Link>
        {/* <Toaster />
        {/* //TODO: Add onClick functionality */}
        <Button
          onClick={() => {
            toast({
              title: 'Product Added Successfully',
              action: <ToastAction altText="Add to cart">View Cart</ToastAction>,
            });
          }}
          className="w-full flex items-center justify-center rounded-md bg-accentLight md:px-5 px-2 md:py-2.5 py-2 md:mb-0 mb-2 text-center text-smm font-medium text-primary hover:bg-accent hover:text-background focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <ShoppingCartIcon className="mb-1 md:mr-2 mr-1 md:h-7 h-4" />
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
