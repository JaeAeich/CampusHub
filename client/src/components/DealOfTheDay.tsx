import Container from './ui/container';
import { Button } from './ui/button';
import {Badge} from './ui/badge';
import { AspectRatio } from "@/components/ui/aspect-ratio"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay"

export default function DealOfTheDay() {
    return (
      <div className="my-7">
      <Container>
        <h1 className='font-Oswald text-2xl font-bold my-4'>Deals of the Day</h1>
        <Carousel plugins={[Autoplay({delay: 6000,})]}>
        <CarouselContent>
        <CarouselItem className="w-full">
    <div className="flex items-center w-full">
      <div className="flex-shrink-0 w-1/3 items-center">
        <AspectRatio ratio={4/3}>
          <img src="./../../public/products/laptop-cover.png" alt="Image" className="rounded-md object-fit mx-4 my-6" />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-center px-16">
        <h3 className="font-Oswald text-xl font-bold my-4 uppercase">STYLISH LAPTOP COVER</h3>
        <p className="font-helvetica text-neutral-600">Introducing our premium laptop cover designed to offer the perfect blend of style and functionality. Crafted with precision, this sleek accessory is tailored to fit and protect your laptop, ensuring it stays safe from scratches, dings, and everyday wear and tear.</p>
        <div className="flex flex-row items-center py-2">
        <p className="font-helvetica flex text-2xl font-bold text-rose-500 pr-2">&#8377;50</p>
        <p className="font-helvetica flex text-neutral-600 text-xl line-through">&#8377;80</p>
        </div>
        <div className="flex-col justify-left">
          <Button className='flex bg-rose-500 my-3'>ADD TO CART</Button>
          <div className="flex items-center">
            <p className="font-helvetica text-neutral-500 text-lg font-bold mr-3">Time left</p>
            <Badge variant="secondary" className='mr-2 px-3 py-2'>12</Badge>:
            <Badge variant="secondary" className='mx-2 px-3 py-2'>16</Badge>:
            <Badge variant="secondary" className='mx-2 px-3 py-2'>48</Badge>
          </div>
        </div>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem className="w-full">
    <div className="flex items-center w-full">
      <div className="flex-shrink-0 w-1/3 items-center">
        <AspectRatio ratio={4/3}>
          <img src="./../../public/products/dosa.png" alt="Image" className="rounded-md object-fit mx-4 my-6" />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-center px-16">
        <h3 className="font-Oswald text-xl font-bold my-4 uppercase">CRISPY MASALA DOSA</h3>
        <p className="font-helvetica text-neutral-600">A thin crisp pancake of indian origin, typically made from rice flour, stuffed with mashed potatoes and served with chutney.</p>
        <div className="flex flex-row items-center py-2">
        <p className="font-helvetica flex text-2xl font-bold text-rose-500 pr-2">&#8377;20</p>
        <p className="font-helvetica flex text-neutral-600 text-xl line-through">&#8377;40</p>
        </div>
        <div className="flex-col justify-left">
          <Button className='flex bg-rose-500 my-3'>ADD TO CART</Button>
          <div className="flex items-center">
            <p className="font-helvetica text-neutral-500 text-lg font-bold mr-3">Time left</p>
            <Badge variant="secondary" className='mr-2 px-3 py-2'>12</Badge>:
            <Badge variant="secondary" className='mx-2 px-3 py-2'>16</Badge>:
            <Badge variant="secondary" className='mx-2 px-3 py-2'>48</Badge>
          </div>
        </div>
      </div>
    </div>
  </CarouselItem>
</CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </Container>
      </div>
    );
  }
  