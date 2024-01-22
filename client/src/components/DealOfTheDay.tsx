import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Container from './ui/container';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { deals } from '../../app/constants';

export default function DealOfTheDay() {
  return (
    <div>
      <Container>
        <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold my-4">
          Deals of the Day
        </h2>
        <Carousel plugins={[Autoplay({ delay: 6000 })]}>
          <CarouselContent>
            {deals.map((deal) => (
              <CarouselItem key={deal.name} className="w-full">
                <div className="flex flex-col lg:flex-row w-full">
                  <div className="flex-shrink-0 lg:w-1/3 w-full items-center sm:h-40 md:h-60 lg:h-full h-36 my-3">
                    <img src={deal.image} alt={deal.name} className="rounded-md h-full mx-auto" />
                  </div>
                  <div className="flex flex-col lg:w-2/3 justify-center xl:px-16 lg:px-3">
                    <h3 className="font-subheading xl:text-xl md:text-xl text-lgg font-bold my-3">
                      {deal.name}
                    </h3>
                    <p className="font-body  text-md text-darkgray overflow-hidden line-clamp-3">
                      {deal.desc}
                    </p>
                    <div className="lg:flex-col flex-row lg:justify-left">
                      <div className="flex flex-row items-center py-2">
                        <p className="font-helvetica flex xl:text-2xl text-xl font-bold text-accent pr-2">
                          &#8377;
                          {deal.discountedCost}
                        </p>
                        <p className="font-helvetica flex text-primary xl:text-lg text-md line-through">
                          &#8377;
                          {deal.originalCost}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="flex bg-accent hover:bg-accentDark  text-background font-bold mb-4"
                      >
                        ADD TO CART
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <p className="font-subheading text-primary mr-3">Gone in</p>
                      <Badge
                        variant="secondary"
                        className="font-bold text-body xl:text-lg md:text-md text-sm mr-2 px-3 py-1 gap-2 flex flex-row justify-center items-center hover:bg-secondary"
                      >
                        12h
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="font-bold text-body xl:text-lg md:text-md text-sm mr-2 px-3 py-1 gap-2 flex flex-row justify-center items-center hover:bg-secondary"
                      >
                        16m
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="font-bold text-body xl:text-lg md:text-md text-sm mr-2 px-3 py-1 gap-2 flex flex-row justify-center items-center hover:bg-secondary"
                      >
                        48s
                      </Badge>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
}
