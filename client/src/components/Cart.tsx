import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import iCart from '@/api/cart/types';
import { useAppDispatch } from '@/utils/hooks'
import { addProductToCartAsync, removeProductAsync, removeProductFromCartAsync } from '@/store/cart/cartSlice';
import { Plus, Minus, X } from 'lucide-react';
import addOrder from '@/api/orders/orders';
import { Toaster } from '@/components/ui/toaster';
import useRazorpay from 'react-razorpay';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductByProductId } from '@/api/products/products';
import Product from '@/api/products/types';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

const razorpay_id = import.meta.env.VITE_RAZORPAY_ID;
function Cart() {
  const cart = useSelector((state: RootState) => state.cart) as iCart;
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product_details, setProductDetails] = useState<{ [key: string]: Product }>({});

  const handleIncrement = (p_id: string) => {
    appDispatch(addProductToCartAsync(p_id));
  };

  const handleDecrement = (p_id: string) => {
    appDispatch(removeProductFromCartAsync(p_id));
  };

  function handleRemove(p_id: string) {
    appDispatch(removeProductAsync(p_id));
  }

  const { toast } = useToast();
  const [Razorpay] = useRazorpay();
  const orderData = {
    user_id: '',
    email_id: 'h@h.com',
    product_list: [
      {
        product_id: 'product_id',
        quantity: 1,
        wishlisted_price: 0,
      },
    ],
    store_id: 'store5',
    store_name: 'Store Name',
    delivery_status: false,
    amount_paid: 134.98,
    delivery_address: 'Delivery Address',
    seller_id: 'seller_id',
    created_at: '',
  };
  const handleBuy = async () => {
    // Prepare order data

    try {
      // Send order to backend
      const response = await addOrder(orderData);
      if ('id' in response) {
        const options = {
          key: razorpay_id,
          name: 'Campus Hub',
          description: 'Transaction',
          image: '/logo.png',
          order_id: response.id,
          amount: Math.ceil(orderData.amount_paid * 100).toString(),
          currency: 'INR',
          handler: () => {
            toast({
              title: 'Order created successfully',
              action: <ToastAction altText="View My Order">My Orders</ToastAction>,
            });
            setTimeout(() => {
              navigate(`/`);
            }, 3000);
          },
          prefill: {
            name: 'Your Name',
            email: 'youremail@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on('payment.failed', () => {
          // TODO: Cart values are reset to zero always. Order is created regardless of payment status. Pay again option must be available in orders in case of failure.
          toast({
            title: 'Payment Failed, Please try again',
            action: <ToastAction altText="Try Again">View Cart</ToastAction>,
          });
          setTimeout(() => {
            navigate(`/`);
          }, 3000);
        });

        rzp1.open();
      } else {
        throw new Error('Order creation failed: No order ID in the response');
      }
    } catch (error) {
      toast({
        title: 'Payment Failed, Please try again',
        action: <ToastAction altText="Try Again">View Cart</ToastAction>,
      });
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const promises = cart.carts.map(async (item) => {
        const response = await getProductByProductId(item.product_id);
        return { [item.product_id]: response };
      });
  
      const productDetailsArray = await Promise.all(promises);
      const details = productDetailsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setProductDetails(details as { [key: string]: Product });
    };
  
    fetchProductDetails();
  }, [cart]);

  return (
    <div className="lg:pt-10 pt-2">
      <div className="mx-auto max-w-8xl justify-center mx-8 xl:flex xl:space-x-6 xl:px-0">
        <div className="rounded-lg xl:w-2/3">
          {cart.carts && cart.carts.map((item) => (
            <div className="justify-between mb-6 rounded-lg bg-background p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={product_details[item.product_id] && product_details[item.product_id].product_images[0]}
                alt={item.product_id}
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-primary text-subheading">
                    {product_details[item.product_id] && product_details[item.product_id].product_name}
                  </h2>
                  <p className="mt-1 text-xs text-darkgray text-subheading">Store Name</p>
                </div>
                <div className="mt-4 flex sm:flex-row flex-col justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex sm:justify-start justify-center items-center border-secondary">
                    <Button
                      onClick={() => handleIncrement(item.product_id)}
                      className="cursor-pointer rounded-l bg-secondary md:py-1 py-1.5 md:px-3.5 px-2 duration-100 hover:bg-accentDark"
                    >
                      <Plus className="md:h-6 h-4" />
                    </Button>
                    <input
                      className="md:h-8 h-7 w-12 border bg-background text-center text-xs outline-none"
                      type="number"
                      value={item.quantity}
                      min="1"
                      readOnly
                    />
                    <Button
                      onClick={() => handleDecrement(item.product_id)}
                      className="cursor-pointer rounded-r bg-secondary md:py-1 py-1.5 md:px-3.5 px-2 duration-100 hover:bg-accentDark"
                    >
                      <Minus className="md:h-6 h-4" />
                    </Button>
                      <X
                      className="sm:block hidden lg:ml-3 font-bold hover:text-accentDark cursor-pointer"
                      onClick={() => handleRemove(item.product_id)}/>
                    
                  </div>
                  <div className="flex sm:justify-end justify-center sm:mt-0 mt-2">
                    <p className="text-lgg font-bold">
                    {product_details[item.product_id] && product_details[item.product_id].product_cost * item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-background p-6 shadow-md xl:mt-0 xl:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-primary">Subtotal</p>
            <p className="text-primary">&#8377; 129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-primary">Shipping</p>
            <p className="text-primary">&#8377; 4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">&#8377; 134.98</p>
              <p className="text-sm text-primary">including VAT</p>
            </div>
          </div>
          <Toaster />
          <Button
            className="mt-6 w-full rounded-md bg-accent py-1.5 font-medium text-primary hover:bg-accentDark"
            onClick={handleBuy}
          >
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
