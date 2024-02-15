import { getStoresBySellerId } from "@/api/sellers/sellers";
import Store from "@/api/stores/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import StoreCard from "./StoreCard";

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
            setSellerStores(response.stores);
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
      <div className="mx-auto items-center my-auto">
        <NotFound item="Stores" />
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col w-full">
      <div className="flex flex-col w-full p-10">
        {sellerStores.length>0&&sellerStores.map((store: Store) => (
          <Link to={`/stores/${store.store_id}/dashboard`}>
            <StoreCard store={store} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SellerStoreListPage;