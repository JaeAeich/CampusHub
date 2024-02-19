import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Store from '@/api/stores/types';
import { getStoreById } from '@/api/stores/stores';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Container from './ui/container';
import NotFound from './NotFound';

function SellerDashboard() {
  const { store_id } = useParams();
  const [errorStore, setErrorStore] = useState(false);
  const routes = ['inventory', 'orders', 'reviews'];
  const [store, setStores] = useState<Store>();
  useEffect(() => {
    async function fetchStore() {
      if (store_id) {
        const response = await getStoreById(store_id);
        if ('error' in response) {
          setErrorStore(true);
        } else if ('store' in response) {
          setStores(response.store as Store);
        }
      } else {
        setErrorStore(true);
      }
    }
    fetchStore();
  }, [store_id, setStores]);

  if (errorStore) {
    return <NotFound item="Store" />;
  }

  return (
    <Container>
      <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold sm:my-4 mt-6 sm: mb-2">
        {store?.store_name}&apos;s Dashboard
      </h2>

      <div className="pt-4 mb-10">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {routes.map((route) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 sm:basis-1/2">
                <div className="relative group">
                  <Link to={`/stores/${store_id}/${route}`}>
                    <Card className="bg-gradient-to-r from-secondaryLight to-secondary cursor-pointer">
                      <div className="flex-row flex justify-between">
                        <h1 className="px-4 pt-4 xl:text-xl md:text-lg sm:text-md font-subheading font-semibold">
                          {route[0].toUpperCase() + route.slice(1)}
                        </h1>
                      </div>
                      <CardContent className="flex sm:aspect-[3/2] aspect-[2] items-center justify-center sm:p-6">
                        <img
                          src={`/my-${route}.png`}
                          alt=""
                          className="blog-banner h-full transition-transform transform group-hover:scale-110"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Container>
  );
}

export default SellerDashboard;
