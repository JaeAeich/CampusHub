import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Service from '@/api/services/types';
import Container from './ui/container';
// import { services } from '../../app/constants';
import { getServices } from '../api/services/services';

export default function ServiceCards() {
  const [services, setServices] = useState<Service[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await getServices();
        if ('services' in response) {
          setServices(response.services);
        } else {
          setFetchError('No services found.');
        }
      } catch (error: unknown) {
        setFetchError('No services found.');
      }
    }

    fetchServices();
  }, []);

  if (fetchError) {
    return (
      <Container>
        <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold sm:my-4 mt-10 sm:mb-2">
          Services
        </h2>
        <h2 className="xl:text-xl sm:text-lg text-lg text-secondary font-body sm:my-4 mt-10 mt-0 sm:mb-24 mb-12">
          {fetchError}
        </h2>
      </Container>
    );
  }
  const handleRouteToStore = () => {};
  return (
    <Container>
      <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold sm:my-4 mt-10 sm: mb-2">
        Services
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
                key={service.service_name}
                onClick={() => handleRouteToStore()}
                className="md:basis-1/2 lg:basis-1/3 sm:basis-1/2"
              >
                <Link to={`/services/${service.service_id}/stores`}>
                  {/* TODO: Route to the store path onClick */}
                  <div className="relative group">
                    <Card className="bg-gradient-to-r from-accentLighter to-accentLight">
                      <div className="flex-row flex justify-between">
                        <h1 className="px-4 pt-4 xl:text-xl md:text-lg sm:text-md font-subheading font-semibold">
                          {service.service_name}
                        </h1>
                      </div>
                      <CardContent className="flex sm:aspect-[3/2] aspect-[2] items-center justify-center sm:p-6">
                        <img
                          src={service.service_images[0]}
                          alt={service.service_name}
                          className="blog-banner h-full transition-transform transform group-hover:scale-110"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Container>
  );
}
