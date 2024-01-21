import Container from './ui/container';
import { Button } from './ui/button';
import {Badge} from './ui/badge';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {deals} from '../../app/constants'
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
        {deals.map((deal)=><CarouselItem className="w-full">
    <div className="flex items-center w-full">
      <div className="flex-shrink-0 w-1/3 items-center">
        <AspectRatio ratio={4/3}>
          <img src={deal['image']} alt={deal['name']} className="rounded-md object-fit mx-4 my-6" />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-center px-16">
        <h3 className="font-Oswald text-xl font-bold my-4 uppercase">{deal['name']}</h3>
        <p className="font-helvetica text-neutral-600">{deal['desc']}</p>
        <div className="flex flex-row items-center py-2">
        <p className="font-helvetica flex text-2xl font-bold text-rose-500 pr-2">&#8377;{deal['discountedCost']}</p>
        <p className="font-helvetica flex text-neutral-600 text-xl line-through">&#8377;{deal['originalCost']}</p>
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
  </CarouselItem>)}
</CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </Container>
      </div>
    );
  }
  