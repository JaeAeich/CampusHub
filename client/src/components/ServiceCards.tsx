import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Container from './ui/container';
import { services } from '../../app/constants';

export default function ServiceCards() {
  const handleRouteToStore = () => {};

  return (
    <Container>
      <h2 className="font-heading text-2xl font-bold my-4">Services</h2>
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
                className="md:basis-1/2 lg:basis-1/3"
              >
                {/* TODO: Route to the store path onClick */}
                <div className="m-1 relative group">
                  <Card>
                    <h1 className='p-4 text-xl font-subheading font-semibold'>{service.name}</h1>
                    <CardContent className="flex aspect-[3/2] items-center justify-center p-6">
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
