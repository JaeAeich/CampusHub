import { getOrdersByStoreId } from '@/api/stores/stores';
import Order from '@/api/orders/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function StoreOrderList() {
  const { store_id } = useParams();
  const [storeOrders, setStoreOrders] = useState<Order[]>([]);
  const [errorOrders, setErrorOrders] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStoreOrders() {
      if (store_id !== undefined) {
        const response = await getOrdersByStoreId(store_id);
        if ('error' in response) {
          setErrorOrders(true);
          setIsLoading(false);
        } else if ('orders' in response) {
          setStoreOrders(response.orders);
          setIsLoading(false);
        }
      }
    }
    fetchStoreOrders();
  }, [store_id]);

  if (isLoading) {
    return (
      <div className="h-auto my-auto mx-auto justify-center items-center">
        <img src="/loading.gif" alt="" className="opacity-70" />
      </div>
    );
  }
  if (storeOrders.length === 0 || errorOrders) {
    return (
      <div className="flex flex-col items-center mx-auto justify-center m-10 mb-20">
        <img src="/noresult.gif" alt="noResults" className="h-24 sm:h-32 w-96 md:h-108 lg:w-128" />
        <h2 className="align-center text-darkgray text-smm md:text-lg">No Orders yet!</h2>
      </div>
    );
  }
  return (
    <div className="bg-background pt-6 w-full px-3 lg:pr-10 lg:flex-row text-primary">
      <div className="flex flex-col w-full text-sm border-secondary">
        <h2 className="mt-3 text-xl font-bold font-heading justify-center mx-auto">
          Store orders list
        </h2>

        <main className="sm:w-4/5 mx-auto justify-center min-h-screen py-1">
          <div className="lg:pt-10 pt-2 sm:mx-12 mx-6">
            <div className="mx-auto max-w-8xl justify-center lg:mx-10 mx-6 xl:flex xl:space-x-6 xl:px-0">
              <div className="rounded-lg xl:w-full">
                {storeOrders &&
                  storeOrders.map((order: Order) => (
                    <div className="justify-between mb-6 rounded-lg bg-background p-6 shadow-md sm:flex sm:justify-start">
                      <div className="flex flex-col w-full sm:ml-4">
                        <div className="sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-primary text-subheading">
                              {order.created_at.slice(0, 10)}
                            </h2>
                            <p className="font-semibold md:text-base text-smm text-secondary text-subheading">
                              {order.store_name}
                            </p>
                          </div>
                          <div className="flex flex-col space-between">
                            <p className="flex sm:text-xl text-lg font-bold  justify-end text-accent">
                              {order.delivery_status ? 'Delivered' : 'Pending'}
                            </p>
                            <p className="flex md:text-lg text-smm justify-end font-bold">
                              &#8377; {order.amount_paid}
                            </p>
                          </div>
                        </div>

                        <div className="h-full flex sm:mb-0 mb-2 justify-end">
                          <p className="flex md:text-base text-smm text-secondary justify-end">
                            Order Id: {order.order_id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StoreOrderList;
