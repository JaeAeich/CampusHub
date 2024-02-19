import { getStoresBySellerId } from '@/api/sellers/sellers';
import Store from '@/api/stores/types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import StoreCard from './StoreCard';

function SellerStoreListPage() {
  const { seller_id } = useParams();
  const [sellerStores, setSellerStores] = useState<Store[]>([]);
  const [errorStores, setErrorStores] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSellerStores() {
      if (seller_id !== undefined) {
        const response = await getStoresBySellerId(seller_id);
        if ('error' in response) {
          setErrorStores(true);
          setIsLoading(false);
        } else if ('stores' in response) {
          setSellerStores(response.stores as Store[]);
          setIsLoading(false);
        }
      }
    }
    fetchSellerStores();
  }, [seller_id]);

  if (isLoading) {
    return (
      <div className="h-auto my-auto mx-auto justify-center items-center">
        <img src="/loading.gif" alt="" className="opacity-70" />
      </div>
    );
  }
  if (sellerStores.length === 0 || errorStores) {
    return (
      <div className="flex flex-col items-center mx-auto justify-center m-10 mb-20">
        <img src="/noresult.gif" alt="noResults" className="h-24 sm:h-32 w-96 md:h-108 lg:w-128" />
        <h2 className="align-center text-darkgray text-smm md:text-lg">
          No stores!{' '}
          <Link to={`/sellers/${seller_id}/createstore`}>
            <Button className="text-sm font-bold ml-3 bg-secondary hover:bg-accent text-primary">
              Add a store
            </Button>
          </Link>
        </h2>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col w-full">
      <div className="flex flex-col w-full p-10">
        {sellerStores.length > 0 &&
          sellerStores.map((store: Store) => (
            <Link to={`/stores/${store.store_id}/dashboard`}>
              <StoreCard store={store} />
            </Link>
          ))}
        <Link to={`/sellers/${seller_id}/createstore`} className="w-full">
          <Button className="text-base font-bold p-5 ml-3 bg-secondary hover:bg-accent text-primary">
            Add a store
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SellerStoreListPage;
