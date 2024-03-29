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
    <div className="my-2 max-h-128 lg:my-4 overflow-hidden object-fit">
      <Container>
        <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold my-4">
          Trending
        </h2>
        {error || trendingStores.length === 0 ? (
          <NotFound item="Trending stores" />
        ) : (
          <Carousel className="w-full" plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent>
              {trendingStores.map((store) => (
                <CarouselItem
                  key={store.store_id}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Link
                    to={`/stores/${store.store_id}/products`}
                    className="w-full h-full object-fit overflow-hidden"
                  >
                    <img
                      src={store.store_images[0]}
                      alt={store.store_name}
                      className="rounded-md object-cover w-full h-1/3 overflow-hidden"
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
