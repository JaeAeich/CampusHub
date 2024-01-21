import { AspectRatio } from '@/components/ui/aspect-ratio';
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
        <h2 className="font-Oswald text-2xl font-semibold my-4">Deals of the Day</h2>
        <Carousel plugins={[Autoplay({ delay: 6000 })]}>
          <CarouselContent>
            {deals.map((deal) => (
              <CarouselItem key={deal.name} className="w-full">
                <div className="flex items-center w-full flex-col sm:flex-row">
                  <div className="flex-shrink-0 w-1/3 items-center">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="rounded-md object-fit mx-4 my-6"
                      />
                    </AspectRatio>
                  </div>
                  <div className="flex flex-col justify-center px-16">
                    <h3 className="font-Oswald text-xl font-bold my-4 uppercase">{deal.name}</h3>
                    <p className="font-helvetica text-primary">{deal.desc}</p>
                    <div className="flex flex-row items-center py-2">
                      <p className="font-helvetica flex text-2xl font-bold text-destructive pr-2">
                        &#8377;
                        {deal.discountedCost}
                      </p>
                      <p className="font-helvetica flex text-primary text-xl line-through">
                        &#8377;
                        {deal.originalCost}
                      </p>
                    </div>
                    <div className="flex-col justify-left">
                      <Button variant="outline" className="flex bg-destructive text-secondary my-3">
                        ADD TO CART
                      </Button>
                      <div className="flex items-center">
                        <p className="font-helvetica text-primary text-lg font-bold mr-3">
                          Gone in
                        </p>
                        <Badge
                          variant="secondary"
                          className="mr-2 px-3 py-2 gap-2 flex flex-row justify-center items-center"
                        >
                          12
                          <code>hour</code>
                        </Badge>

                        <Badge
                          variant="secondary"
                          className="mx-2 px-3 py-2 gap-2 flex flex-row justify-center items-center"
                        >
                          16
                          <code>min</code>
                        </Badge>

                        <Badge
                          variant="secondary"
                          className="mx-2 px-3 py-2 gap-2 flex flex-row justify-center items-center"
                        >
                          48
                          <code>sec</code>
                        </Badge>
                      </div>
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
