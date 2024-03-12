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
    <div className="my-2 lg:h-108 md:h-96 lg:my-4 overflow-hidden object-fit">
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
                  className="w-full h-full flex items-center justify-center md:my-0 my-auto"
                >
                  <Link
                    to={`/stores/${store.store_id}/products`}
                    className="w-full h-full object-fit overflow-hidden items-center md:my-0 my-auto"
                  >
                    <img
                      src={store.store_images[0]}
                      alt={store.store_name}
                      className="rounded-md w-full h-full object-cover w-full overflow-hidden md:my-0 my-auto"
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
