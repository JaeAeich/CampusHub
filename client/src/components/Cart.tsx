import { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import addOrder from '@/api/orders/orders';
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const razorpay_id = __RAZORPAY_ID__;
function Cart() {
  const [quantity, setQuantity] = useState(2);
  const navigate=useNavigate();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const [Razorpay] = useRazorpay();
  const orderData = {
    user_id: '', 
    email_id: 'h@h.com',
    product_list: [{
      product_id: 'product_id', 
      quantity: 1,
      wishlisted_price: 0, 
    }],
    store_id: 'store5', 
    store_name: 'Store Name', 
    delivery_status: false,
    amount_paid: 134.98, 
    delivery_address: 'Delivery Address', 
    seller_id: 'seller_id',
    created_at: ''
  };
  const handleBuy = async () => {
    // Prepare order data

    try {
      // Send order to backend
      const response = await addOrder(orderData);
      const options = {
        key: razorpay_id,
        name: "Campus Hub",
        description: "Transaction",
        image: "/logo.png",
        order_id: response, 
        amount: "50000", currency: "INR",
        handler: (res) => {
          // alert(response)
          navigate(`/orders/success`);
          // alert(res.razorpay_payment_id);
          // alert(res.razorpay_order_id);
          // alert(res.razorpay_signature);
        },
        prefill: {
          name: "Your Name",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed"
      , (res) => {
        navigate(`/orders/failure`);
        // alert(res.error.code);
        // alert(res.error.description);
        // alert(res.error.source);
        // alert(res.error.step);
        // alert(res.error.reason);
        // alert(res.error.metadata.order_id);
        // alert(res.error.metadata.payment_id);
      });
    
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  return (
    <div className="lg:pt-10 pt-2">
      <div className="mx-auto max-w-8xl justify-center mx-8 xl:flex xl:space-x-6 xl:px-0">
        <div className="rounded-lg xl:w-2/3">
          <div className="justify-between mb-6 rounded-lg bg-background p-6 shadow-md sm:flex sm:justify-start">
            <img
              src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="product"
              className="w-full rounded-lg sm:w-40"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-primary text-subheading">
                  Nike Air Max 2019
                </h2>
                <p className="mt-1 text-xs text-darkgray text-subheading">Store Name</p>
              </div>
              <div className="mt-4 flex sm:flex-row flex-col justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex sm:justify-start justify-center items-center border-secondary">
                  <Button
                    onClick={() => handleIncrement()}
                    className="cursor-pointer rounded-l bg-secondary md:py-1 py-1.5 md:px-3.5 px-2 duration-100 hover:bg-accentDark"
                  >
                    <Plus className="md:h-6 h-4" />
                  </Button>
                  <input
                    className="md:h-8 h-7 w-12 border bg-background text-center text-xs outline-none"
                    type="number"
                    value={quantity}
                    min="1"
                    readOnly
                  />
                  <Button
                    onClick={() => handleDecrement()}
                    className="cursor-pointer rounded-r bg-secondary md:py-1 py-1.5 md:px-3.5 px-2 duration-100 hover:bg-accentDark"
                  >
                    <Minus className="md:h-6 h-4" />
                  </Button>
                  <X
                    // TODO: Handle remove.
                    // onClick={handleRemove}
                    className="sm:block hidden lg:ml-3 font-bold hover:text-accentDark cursor-pointer"
                  />
                </div>
                <div className="flex sm:justify-end justify-center sm:mt-0 mt-2">
                  <p className="text-lgg font-bold">&#8377; 259.000</p>
                  <X
                    // TODO: Handle remove.
                    // onClick={handleRemove}
                    className="sm:hidden block ml-1 font-bold hover:text-accentDark cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
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
          <Button className="mt-6 w-full rounded-md bg-accent py-1.5 font-medium text-primary hover:bg-accentDark" onClick={handleBuy}>
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
