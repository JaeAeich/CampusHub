import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Service from '@/api/services/types';
import Autoplay from 'embla-carousel-autoplay';
import Container from './ui/container';
import NotFound from './NotFound';
// import { services } from '../../app/constants';

export default function ServiceCards({ services, error }: { services: Service[]; error: boolean }) {
  const handleRouteToStore = () => {};
  return (
    <Container>
      <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold sm:my-4 mt-6 sm: mb-2">
        Services
      </h2>
      {error ? (
        <NotFound item="Services" />
      ) : (
        <div className="mb-10">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full md:block hidden"
            plugins={[Autoplay({ delay: 5000 })]}
          >
            <CarouselContent>
              {services.map((service) => (
                <CarouselItem
                  key={service.service_name}
                  onClick={() => handleRouteToStore()}
                  className="md:basis-1/2 lg:basis-1/3 sm:basis-1/2"
                >
                  {service.service_name !== 'Community Store' ? (
                    <Link to={`/services/${service.service_id}/stores`} className="relative group">
                      <Card className="bg-gradient-to-r from-secondaryLight to-secondary">
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
                    </Link>
                  ) : (
                    <Link to="/stores/store3/products" className="relative group">
                      <Card className="bg-gradient-to-r from-secondaryLight to-secondary">
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
                    </Link>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="md:hidden flex flex-col w-full">
            {services.map((service) => (
              <div
                key={service.service_name}
                // onClick={() => handleRouteToStore()}
                className="w-full"
              >
                <Link to={`/services/${service.service_id}/stores`}>
                  {/* TODO: Route to the store path onClick */}
                  <div className="relative group">
                    <Card className="bg-gradient-to-r from-secondaryLight to-secondary h-36 relative overflow-hidden mt-3">
                      <div className="flex-row flex justify-between">
                        <h1 className="px-4 pt-4 xl:text-xl md:text-lg sm:text-md font-subheading font-semibold">
                          {service.service_name}
                        </h1>
                      </div>
                      <CardContent className="flex sm:aspect-[3/2] aspect-[2] items-center justify-center sm:p-6">
                        <img
                          src={service.service_images[0]}
                          alt={service.service_name}
                          className="blog-banner transition-transform transform group-hover:scale-110 group-hover:opacity-70 absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
