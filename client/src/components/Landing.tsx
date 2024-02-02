import { useState, useEffect } from 'react';
import Service from '@/api/services/types';
import Product from '@/api/products/types';
import Store from '@/api/stores/types';
import Offers from '@/api/offers/types';
import { getProductById, getTrendingStore } from '@/api/stores/stores';
import TrendingStores from './TrendingStores';
import DealOfTheDay from './DealOfTheDay';
import ServiceCards from './ServiceCards';
import { getServices } from '../api/services/services';
import { getTrendingOffers } from '../api/offers/offers';

export default function Landing() {
  const [services, setServices] = useState<Service[]>([]);
  const [errorService, setErrorService] = useState(false);
  const [trendingStores, setTrendingStores] = useState<Store[]>([]);
  const [errorTrendingStore, setErrorTrendingStore] = useState(false);
  const [trendingOffersid, setTrendingOffersid] = useState<Offers[]>([]);
  const [errorTrendingOffer, setErrorTrendingOffer] = useState(false);
  const [trendingOffersProducts, setTrendingOffersProducts] = useState<Product[]>([]);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      const response = await getServices();
      if ('error' in response) {
        setErrorService(true);
      } else if ('services' in response) {
        setServices(response.services);
      }
    }

    fetchServices();
  }, []);

  useEffect(() => {
    async function fetchTrendingStores() {
      const response = await getTrendingStore();
      if ('error' in response) {
        setErrorTrendingStore(true);
      } else if ('stores' in response) {
        setTrendingStores(response.stores);
        setLoaded1(true);
      }
    }

    fetchTrendingStores();
  }, []);

  useEffect(() => {
    async function fetchTrendingOffers() {
      const response = await getTrendingOffers();
      if ('error' in response) {
        setErrorTrendingOffer(true);
      } else if ('offers' in response) {
        setTrendingOffersid(response.offers);
        setLoaded2(true)
      }
    }

    fetchTrendingOffers();
  }, []);

  useEffect(() => {
    const fetchTrendingOffersProducts = async () => {
      const updatedTrendingOffersProducts: Product[] = [];

      await Promise.all(
        trendingOffersid.map(async (offer) => {
          await Promise.all(
            offer.product_ids.map(async (product_id) => {
              const response = await getProductById(offer.store_id, product_id);

              if ('product' in response) {
                const productWithDiscount: Product & { discount?: number } = {
                  ...(response.product as Product),
                  discount: offer.discount,
                };

                updatedTrendingOffersProducts.push(productWithDiscount);
              }
            }),
          );
        }),
      );

      setTrendingOffersProducts(updatedTrendingOffersProducts);
      setLoaded3(true);
    };

    fetchTrendingOffersProducts();
  }, [trendingOffersid]);

  if(!(loaded1&&loaded2&&loaded3)){
    return (
      <div className="h-auto my-auto mx-auto justify-center items-center">
        <img src="/loading.gif" alt="" className="opacity-70" />
      </div>
    );
  }

  return (
    <div className='mx-auto w-full sm:w-lg md:w-3xl lg:w-4xl xl:w-6xl 2xl:w-7xl opacity-100 transition-opacity duration-500 ease-in-out'>
      <TrendingStores trendingStores={trendingStores} error={errorTrendingStore} />
      <DealOfTheDay trendingOffersProducts={trendingOffersProducts} error={errorTrendingOffer} />
      <ServiceCards services={services} error={errorService} />
    </div>
  );
}
