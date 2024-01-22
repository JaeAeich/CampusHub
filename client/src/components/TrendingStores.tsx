import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Container from './ui/container';

export default function TrendingStores() {
  return (
    <div className="my-2 md:my-4">
      <Container>
        <h2 className="font-heading xl:text-2xl sm:text-xl text-lg font-semibold my-4">Trending</h2>
        <Carousel className="w-full" plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent>
            <CarouselItem className="w-full">
              <img src="./../../public/ccd.png" alt="" className="rounded-md object-cover" />
            </CarouselItem>
            <CarouselItem className="w-full flex items-center justify-center">
              <img
                src="./../../public/amul.jpg"
                alt=""
                className="rounded-md object-cover w-full h-full"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
}
