import { AspectRatio } from '@/components/ui/aspect-ratio';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Container from './ui/container';

export default function TrendingStores() {
  return (
    <div className="my-2 md:my-4">
      <Container>
        <h2 className="font-Oswald text-2xl font-semibold my-4">Trending</h2>
        <Carousel plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent>
            <CarouselItem className="w-full">
              <AspectRatio ratio={16 / 6}>
                <img src="./../../public/ccd.png" alt="" className="rounded-md object-cover" />
              </AspectRatio>
            </CarouselItem>
            <CarouselItem className="w-full flex items-center justify-center">
              <AspectRatio ratio={16 / 6} className="w-full">
                <img
                  src="./../../public/amul.jpg"
                  alt=""
                  className="rounded-md object-cover w-full h-full"
                />
              </AspectRatio>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
}
