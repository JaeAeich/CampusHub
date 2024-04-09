import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import Order from '@/api/orders/types';
import { getUserOrders } from '@/api/users/users';
import { getStoreById } from '@/api/stores/stores';
import Store from '@/api/stores/types';
import NotFound from './NotFound';
import Loading from './Loading';

function Orders() {
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState(false);
  const [storeImages, setStoreImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchOrders() {
      if (user_id) {
        const response = await getUserOrders(user_id);
        if ('error' in response) {
          setIsLoading(false);
          setError(true);
        } else if ('orders' in response) {
          setOrders(response.orders as Order[]);
          setIsLoading(false);
        }
      }
    }

    fetchOrders();
  }, [user_id]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const promises = orders.map(async (item) => {
        const response = await getStoreById(item.store_id);
        if ('store' in response) {
          const store = response.store as Store;
          return { [item.order_id]: store.store_images[0] };
        }
        return { [item.order_id]: '' };
      });

      const productDetailsArray = await Promise.all(promises);
      const details = productDetailsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setStoreImages(details as { [key: string]: string });
    };

    fetchProductDetails();
  }, [orders]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || error) {
    return (
      <div className="flex mx-auto justify-center items-center my-auto">
        <NotFound item="Orders" />
      </div>
    );
  }

  return (
    <div className="lg:pt-10 pt-2 sm:mx-12 mx-6">
      <div className="mx-auto max-w-8xl justify-center lg:mx-10 mx-6 xl:flex xl:space-x-6 xl:px-0">
        <div className="rounded-lg xl:w-full">
          {orders &&
            orders.map((order: Order) => (
              <div className="justify-between mb-6 rounded-lg bg-background p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={storeImages[order.order_id]}
                  alt="store"
                  className="w-40 h-20 sm:w-40 sm:h-24 rounded-lg"
                />
                <div className="flex flex-col w-full sm:ml-4">
                  <div className="sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-primary text-subheading">
                        {order.store_name}
                      </h2>
                      <p className="font-semibold md:text-base text-smm text-secondary text-subheading">
                        {order.created_at.slice(0, 10)}
                      </p>
                    </div>
                    <div className="flex flex-col space-between">
                      <p className="flex sm:text-xl text-lg font-bold  justify-end text-accent">
                        {order.delivery_status ? 'Payment Successful' : 'Pending'}
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
  );
}

export default Orders;
