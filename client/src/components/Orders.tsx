import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import Order from "@/api/orders/types";
import { getUserOrders } from "@/api/users/users";
import NotFound from "./NotFound";
import Loading from "./Loading";

function Orders() {
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState(false);

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
  },[user_id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || error) {
    return (
      <div className="mx-auto items-center my-auto">
        <NotFound item="Product" />
      </div>
    );
  }

  return (
    <div className="lg:pt-10 pt-2 sm:mx-12 mx-6">
      <div className="mx-auto max-w-8xl justify-center lg:mx-10 mx-6 xl:flex xl:space-x-6 xl:px-0">
        <div className="rounded-lg xl:w-full">
          {orders && orders.map((order: Order) => (
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
                  <p className="flex md:text-lg text-smm justify-end font-bold">&#8377; {order.amount_paid}</p>
                </div>
              </div>

              <div className="h-full flex sm:mb-0 mb-2 justify-end">
                <p className="flex md:text-base text-smm text-secondary justify-end">
                  Order Id: {order.order_id}
                </p>
              </div>
            </div>
          </div>))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
