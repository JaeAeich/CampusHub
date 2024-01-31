import { useState, useEffect } from 'react';
import Service from '@/api/services/types';
import Store from '@/api/stores/types';
import Offers from '@/api/offers/types';
import { getProductsByStoreId, getTrendingStore } from '@/api/stores/stores';
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
      }
    }

    fetchTrendingOffers();
  }, []);

  // useEffect(() => {
  //   async function fetchTrendingOffersProducts() {
  //       const response = await getProductsByStoreId();
  //       if('error' in response){
  //         setErrorTrendingOffer(true)
  //       }else if('offers' in response){
  //         setTrendingOffersid(response.offers);
  //       }
  //   }

  //   fetchTrendingOffers();
  // }, []);

  return (
    <div className="mx-auto max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
      <TrendingStores trendingStores={trendingStores} error={errorTrendingStore} />
      <DealOfTheDay
      // trendingOffers={trendingOffers}
      //  error={errorTrendingOffer}
      />
      <ServiceCards services={services} error={errorService} />
    </div>
  );
}
