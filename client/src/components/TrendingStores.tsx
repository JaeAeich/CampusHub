import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Store from '@/api/stores/types';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import Container from './ui/container';
import NotFound from './NotFound';

export default function TrendingStores({
  trendingStores,
  error,
}: {
  trendingStores: Store[];
  error: boolean;
}) {
  return (
    <div className="my-2 md:my-4">
      <Container>
        <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold my-4">
          Trending
        </h2>
        {error ? (
          <NotFound item="Trending Stores" />
        ) : (
          <Carousel className="w-full" plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent>
              {trendingStores.map((store) => (
                <CarouselItem
                  key={store.store_id}
                  className="w-full flex items-center justify-center"
                >
                  <Link to={`/stores/${store.store_id}/products`} className="w-full h-full">
                    <img
                      src={store.store_images[0]}
                      alt={store.store_name}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </Container>
    </div>
  );
}
