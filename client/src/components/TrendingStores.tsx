import Container from './ui/container';
import { AspectRatio } from "@/components/ui/aspect-ratio"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay"

export default function TrendingStores() {
    return (
      <div className="my-7">
      <Container>
        <h1 className='font-Oswald text-2xl font-bold my-4'>Trending stores in your campus</h1>
        <Carousel plugins={[Autoplay({delay: 3000,})]}>
        <CarouselContent>
            <CarouselItem className="w-full">
                <AspectRatio ratio={16 / 6}>
                    <img src="./../../public/ccd.png" alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
            </CarouselItem>
            <CarouselItem className="w-full flex items-center justify-center">
            <AspectRatio ratio={16 / 6} className="w-full">
                <img src="./../../public/amul.jpg" alt="Image" className="rounded-md object-cover w-full h-full"/>
            </AspectRatio>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </Container>
      </div>
    );
  }
  