import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Container from './ui/container';
import {stores} from '../../app/constants'

export default function TrendingStores() {
  return (
    <div className="my-2 md:my-4">
      <Container>
        <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold my-4">
          Trending
        </h2>
        <Carousel className="w-full" plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent>
            {stores.map((store) => (
              <CarouselItem key={store.store_id} className="w-full flex items-center justify-center">
                <img
                  src={store.store_images[0]}
                  alt={store.store_name}
                  className="rounded-md object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
}
