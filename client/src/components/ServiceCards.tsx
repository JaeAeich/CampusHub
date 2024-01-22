import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Container from './ui/container';
import { services } from '../../app/constants';

export default function ServiceCards() {
  const handleRouteToStore = () => {};

  return (
    <Container>
      <h2 className="font-heading xl:text-2xl sm:text-xl text-lg font-semibold sm:my-4 mt-10 sm: mb-2">
        Services{' '}
      </h2>
      <div className="mb-10">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem
                key={service.name}
                onClick={() => handleRouteToStore()}
                className="md:basis-1/2 lg:basis-1/3 sm:basis-1/2"
              >
                {/* TODO: Route to the store path onClick */}
                <div className="relative group">
                  <Card>
                    <h1 className="p-4 xl:text-xl md:text-lg sm:text-md font-subheading font-semibold">
                      {service.name}
                    </h1>
                    <CardContent className="flex sm:aspect-[3/2] aspect-[2] items-center justify-center p-6">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="blog-banner h-full transition-transform transform group-hover:scale-110"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Container>
  );
}
