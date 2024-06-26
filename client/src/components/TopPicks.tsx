import { RootState } from '@/store/store';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Product from '@/api/products/types';
import { getProductsByUserId } from '@/api/products/products';
import Container from './ui/container';
import ProductCard from './ProductCard';
// import { services } from '../../app/constants';

export default function ServiceCards() {
  const [products, setProducts] = useState<Product[]>([]);
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const { isAuthenticated } = useAuth0();
  const [errorProducts, setErrorProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProductsByUserId() {
      const response = await getProductsByUserId(user_id);
      if ('error' in response) {
        setErrorProducts(true);
        setIsLoading(false);
      } else if ('products' in response) {
        setProducts(response.products.slice(0, 5));
        setIsLoading(false);
      }
    }
    fetchProductsByUserId();
  }, [user_id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center m-10 mb-20">
        <img src="/noresult.gif" alt="noResults" className="h-16 w-42 md:h-48 md:w-92" />
        <h2 className="align-center text-darkgray text-smm md:text-lg">
          Curating most accurate picks for you. Please wait...
        </h2>
      </div>
    );
  }

  if (products.length === 0 || errorProducts || !isAuthenticated) {
    return null;
  }

  return (
    <Container>
      <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold sm:my-4 mt-6 sm: mb-2">
        Top Picks For You
      </h2>
      {
        <div className="mb-10">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.product_id}
                  className="md:basis-1/2 lg:basis-1/3 basis-full justify-center"
                >
                  <div className="relative group">
                    <ProductCard product={product} wishlisted={false} />
                  </div>
                  {/* </Link> */}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      }
    </Container>
  );
}
