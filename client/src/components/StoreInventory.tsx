import { getProductsByStoreId } from '@/api/stores/stores';
import { Plus } from 'lucide-react';
import Product from '@/api/products/types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import ProductCard from './ProductCard';

function StoreInventory() {
  const navigate = useNavigate();
  const { store_id } = useParams() || '';
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [errorProducts, setErrorProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [productsDone, setProductsDone] = useState(false);
  useEffect(() => {
    async function fetchStoreProducts() {
      if (store_id !== undefined) {
        const response = await getProductsByStoreId(store_id);
        if ('error' in response) {
          setErrorProducts(true);
          setIsLoading(false);
        } else if ('products' in response) {
          setStoreProducts(response.products);
          setIsLoading(false);
        }
      }
    }
    fetchStoreProducts();
  }, [store_id]);

  if (isLoading) {
    return (
      <div className="h-auto my-auto mx-auto justify-center items-center">
        <img src="/loading.gif" alt="" className="opacity-70" />
      </div>
    );
  }
  if (storeProducts.length === 0 || errorProducts) {
    return (
      <div className="flex flex-col items-center mx-auto justify-center m-10 mb-20">
        <img src="/noresult.gif" alt="noResults" className="h-24 sm:h-32 w-96 md:h-108 lg:w-128" />
        <h2 className="align-center text-darkgray text-smm md:text-lg">
          No Products yet? Add a product!
          <Button
            className="ml-2 bg-accent hover:bg-accentDark rounded-full w-16 h-16 p-1"
            onClick={() => navigate(`/stores/${store_id}/createproduct`)}
          >
            <Plus />
          </Button>
        </h2>
        {errorProducts && (
          <h2 className="text-secondary text-smm md:text-lg">
            Please follow the specified format!{' '}
          </h2>
        )}
      </div>
    );
  }
  return (
    <div className=" w-full p-3 my-auto justify-center lg:justify-start">
      <div className="flex h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {storeProducts.map((prod: Product) => (
            <ProductCard product={prod} wishlisted={false} />
          ))}
        </div>
      </div>
      <div className="mx-auto justify-center text-center">
        <Button
          className="ml-2 bg-accent hover:bg-accentDark rounded-full w-16 h-16 p-1"
          onClick={() => navigate(`/stores/${store_id}/createproduct`)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

export default StoreInventory;
