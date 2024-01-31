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

  useEffect(() => {
    async function fetchServices() {
        const response = await getServices();
        if('error' in response){
          setErrorService(true)
        }else if('services' in response){
          setServices(response.services);
        }
    }

    fetchServices();
  }, []);

  useEffect(() => {
    async function fetchTrendingStores() {
        const response = await getTrendingStore();
        if('error' in response){
          setErrorTrendingStore(true)
        }else if('stores' in response){
          setTrendingStores(response.stores);
        }
    }

    fetchTrendingStores();
  }, []);

  useEffect(() => {
    async function fetchTrendingOffers() {
        const response = await getTrendingOffers();
        if('error' in response){
          setErrorTrendingOffer(true)
        }else if('offers' in response){
          setTrendingOffersid(response.offers);
        }
    }

    fetchTrendingOffers();
  }, []);

  useEffect(() => {
    const fetchTrendingOffersProducts = async () => {
      const updatedTrendingOffersProducts: Product[] = [];

      for (const offer of trendingOffersid) {
        for (const product_id of offer.product_ids) {
          const response = await getProductById(offer.store_id, product_id);
    
          if ('product' in response) {
            const productWithDiscount= {
              ...response.product,
              discount: offer.discount,
            };
    
            updatedTrendingOffersProducts.push(productWithDiscount);
          }
        }
      }

      setTrendingOffersProducts(updatedTrendingOffersProducts);
    };

    fetchTrendingOffersProducts();
  }, [trendingOffersid]);

  return (
    <div className="mx-auto w-full sm:w-lg md:w-3xl lg:w-4xl xl:w-6xl 2xl:w-7xl">
      <TrendingStores trendingStores={trendingStores} error={errorTrendingStore}/>
      <DealOfTheDay trendingOffersProducts={trendingOffersProducts} error={errorTrendingOffer}/>
      <ServiceCards services={services} error={errorService}/>
    </div>
  );
}
