import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '@/api/products/types';
import { useAuth0 } from '@auth0/auth0-react';
import { getProductById } from '@/api/stores/stores';
import { useAppDispatch } from '@/utils/hooks';
import { RootState } from '../store/store';
import { Button } from './ui/button';
import { Carousel, CarouselItem, CarouselContent } from './ui/carousel';
import Stars from './Stars';
import { Badge } from './ui/badge';
import NotFound from './NotFound';
import Loading from './Loading';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { addProductToCartAsync } from '../store/cart/cartSlice';
import Reviews from './Reviews';

export default function ProductPage() {
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [errorProduct, setErrorProduct] = useState(false);
  const { store_id, product_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { loginWithRedirect } = useAuth0();
  const [current, setCurrent] = useState('/noImage.png');
  const userExists = useSelector((state: RootState) => state.auth.value);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    async function fetchProductById() {
      if (store_id !== undefined && product_id !== undefined) {
        const response = await getProductById(store_id, product_id);

        if ('error' in response) {
          setErrorProduct(true);
          setIsLoading(false);
        } else if ('product' in response) {
          setProduct(response.product as Product);
          setIsLoading(false);
        }
      }
    }

    fetchProductById();
  }, [store_id, product_id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!product || errorProduct) {
    return (
      <div className="mx-auto items-center my-auto">
        <NotFound item="Product" />
      </div>
    );
  }

  function handleAddToCart() {
    appDispatch(addProductToCartAsync(product_id as string));
  }

  return (
    <div className="py-10 mx-auto sm:w-7xl max-w-full">
      <div className="w-full mx-auto px-4 flex flex-col lg:flex-row sm:mx-4 mx-2">
        <div className="w-full lg:flex-1 lg:mx-10">
          <div className="lg:h-[460px] md:h-[400px] h-auto sm:w-[600px] w-full rounded-lg overflow-hidden mx-auto">
            <img
              src={product.product_images.length > 0 ? product.product_images[0] : current}
              alt="current"
              className="w-full h-full object-contain"
            />
          </div>
          <Carousel className="my-10">
            <CarouselContent>
              {product.product_images.map((image: string, index: number) => (
                <CarouselItem
                  className="lg:w-16 lg:h-32 h-auto sm:basis-1/3 basis-1/2"
                  onMouseEnter={() => setCurrent(image)}
                >
                  {/* Apply object-fit style to the thumbnail images */}
                  <img src={image} alt={`${index}`} className="w-full h-full object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="max-w-2xl flex flex-col h-full px-4 lg:justify-left sm:justify-center sm:items-center justify-left">
          <div className="lg:flex-1">
            <h2 className="sm:text-2xl text-xll font-heading font-semibold text-primary">
              {product.product_name}
            </h2>
            <p className="font-body sm:text-lg text-base text-primary mb-4">
              {product.product_description}
            </p>
            <div className="sm:mb-4 mb-2">
              <div className="flex items-center">
                {product.product_categories.map((cat: string) => (
                  <Badge className="rounded-lg px-1 mr-2 font-medium text-sm bg-accent text-primary hover:bg-accent hover:text-primary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <Stars rating={product.rating} />
              <span className="mr-2 lg:ml-3 rounded bg-secondaryLight lg:px-2.5 lg:py-0.5 px-1.5 py-0.5 sm:text-smm text-sm font-semibold">
                {product.rating}
              </span>
            </div>
            <div className="flex flex-col lg:mb-4 mb-2">
              <p className="text-primary font-bold sm:text-3xl text-2xl sm:leading-10 leading-7">
                &#8377; {product.product_cost}
              </p>
              {product.stock ? (
                <p className="text-green-700 text-smm font-body">In Stock</p>
              ) : (
                <p className="text-red-700 text-smm font-body">Unavailable</p>
              )}
            </div>

            <div>
              <span className="font-normal text-md text-primary text-subheading">
                Product Specification
              </span>

              {Object.entries(product.product_specifications).map(([key, value]) => (
                <div className="flex flex-row mt-1">
                  <p className="font-medium font-subheading text-primary capitalize mr-2 txt-md">
                    {key}:
                  </p>
                  <p className="font-subheading text-darkgray text-md">
                    {value as React.ReactNode}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="only-button flex mx-auto">
            <div className="flex sm:flex-row flex-col sm:my-7 my-3">
              <div className="w-32 px-2 m-2">
                <Button
                  onClick={() => {
                    if (userExists) {
                      toast({
                        title: 'Product Added to Cart Successfully',
                        action: <ToastAction altText="Add to cart">View Cart</ToastAction>,
                      });
                      handleAddToCart();
                    } else {
                      toast({
                        title: 'Please Log in!',
                        action: (
                          <Button className="w-15" onClick={() => loginWithRedirect()}>
                            Login
                          </Button>
                        ),
                      });
                    }
                  }}
                  className="w-full bg-accent text-white py-2 px-4 rounded-full font-bold hover:bg-accentDark"
                >
                  Add to Cart
                </Button>
              </div>
              <div className="w-32 px-2 m-2">
                <Button
                  className="w-full bg-secondary py-2 px-4 rounded-full hover:bg-primary hover:text-background font-bold"
                  onClick={() => {
                    if (userExists) {
                      toast({
                        title: 'Product Added to Cart Successfully',
                        action: <ToastAction altText="Add to cart">View Cart</ToastAction>,
                      });
                    } else {
                      toast({
                        title: 'Please Log in!',
                        action: <Button onClick={() => loginWithRedirect()}>Login</Button>,
                      });
                    }
                  }}
                >
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reviews product_id={product_id || ''} store_id={store_id || ''} />
    </div>
  );
}
