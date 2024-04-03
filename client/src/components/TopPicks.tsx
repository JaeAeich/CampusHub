import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Product from '@/api/products/types';
import Autoplay from 'embla-carousel-autoplay';
import Container from './ui/container';
import NotFound from './NotFound';
import ProductCard from './ProductCard';
// import { services } from '../../app/constants';

export default function ServiceCards({ TopPicks, error }: { TopPicks: Product[]; error: boolean }) {
  return (
    <Container>
      <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold sm:my-4 mt-6 sm: mb-2">
        Top Picks For You
      </h2>
      {error ? (
        <NotFound item="Top Picks" />
      ) : (
        <div className="mb-10">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full md:block hidden"
          >
            <CarouselContent>
              {TopPicks.map((product) => (
                <CarouselItem
                  key={product.product_id}
                  className="md:basis-1/2 lg:basis-1/3 sm:basis-1/2"
                >
                  <Link to={`/products/${product.product_id}`}>
                    {/* TODO: Route to the store path onClick */}
                    <div className="relative group">
                      <ProductCard product={product} wishlisted={false} />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </Container>
  );
}
