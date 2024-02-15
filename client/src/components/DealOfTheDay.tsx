import { useSelector } from 'react-redux';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Product from '@/api/products/types';
import { useAuth0 } from '@auth0/auth0-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import NotFound from './NotFound';
import Container from './ui/container';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { RootState } from '../store/store';
// import { deals } from '../../app/constants';

export default function DealOfTheDay({
  trendingOffersProducts,
  error,
}: {
  trendingOffersProducts: (Product & { discount?: number })[];
  error: boolean;
}) {
  const { loginWithRedirect } = useAuth0();

  const { toast } = useToast();
  const userExists = useSelector((state: RootState) => state.auth.value);

  return (
    <div>
      <Container>
        <h2 className="font-heading xl:text-xll sm:text-xl text-lgg font-semibold my-4">
          Deals of the Day
        </h2>
        {error || trendingOffersProducts.length === 0 ? (
          <NotFound item="Trending offers" />
        ) : (
          <Carousel plugins={[Autoplay({ delay: 6000 })]}>
            <CarouselContent>
              {trendingOffersProducts.map((deal) => (
                <CarouselItem key={deal.product_name} className="w-full">
                  <div className="flex flex-col lg:flex-row w-full">
                    <Link
                      to={`stores/${deal.store_id}/products/${deal.product_id}/`}
                      className="flex-shrink-0 lg:w-1/3 w-full items-center sm:h-40 md:h-60 lg:h-full h-36 my-3"
                    >
                      <img
                        src={deal.product_images ? deal.product_images[0] : './noImage.png'}
                        alt={deal.product_name}
                        className="rounded-md h-full mx-auto"
                      />
                    </Link>
                    <div className="flex flex-col lg:w-2/3 justify-center xl:px-16 lg:px-3">
                      <h3 className="font-subheading xl:text-xl md:text-xl text-lgg font-bold my-3">
                        {deal.product_name}
                      </h3>
                      <p className="font-body  text-md text-darkgray overflow-hidden line-clamp-3">
                        {deal.product_description}
                      </p>
                      <div className="lg:flex-col flex-row lg:justify-left">
                        <Link
                          to={`stores/${deal.store_id}/products/${deal.product_id}/`}
                          className="flex
                          flex-row
                          items-center
                          py-2"
                        >
                          <p className="font-helvetica flex xl:text-2xl text-xl font-bold text-accent pr-2">
                            &#8377;
                            {deal.discount}
                          </p>
                          <p className="font-helvetica flex text-primary xl:text-lg text-md line-through">
                            &#8377;
                            {deal.product_cost}
                          </p>
                        </Link>

                        <Button
                          variant="outline"
                          className="flex bg-accent hover:bg-accentDark  text-background font-bold mb-4"
                          onClick={() => {
                            if (userExists) {
                              toast({
                                title: 'Product Added to Cart Successfully',
                                action: <ToastAction altText="Add to cart">View Cart</ToastAction>,
                              });
                            } else {
                              toast({
                                title: 'Please Log in!',
                                action: (
                                  <Button className="w-15" onClick={() => loginWithRedirect()}>
                                    Login
                                  </Button>
                                ),
                              });
                            }
                          }}
                        >
                          ADD TO CART
                        </Button>
                      </div>
                      <Link
                        to={`stores/${deal.store_id}/products/${deal.product_id}/`}
                        className="flex items-center"
                      >
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
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </Container>
    </div>
  );
}
