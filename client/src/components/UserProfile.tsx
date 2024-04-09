import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountDetails from './AccountDetails';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Orders from './Orders';
import { Button } from './ui/button';

const user_id = 1;

function UserProfile({ active, userEmail }: { active: string; userEmail: string | undefined }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(active);

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const handleTabClick = (tab: string) => {
    const state = tab.split('/')[3];
    setActiveTab(state);
    navigate(tab);
  };

  return (
    <div className="bg-background w-full :gap-5 px-3 lg:pr-10 lg:flex-row text-primary">
      <div className="flex flex-col gap-2 w-full p-4 text-sm border-secondary top-12">
        <h2 className="mt-3 mb-4 text-xl font-bold font-heading justify-center mx-auto">
          My Account
        </h2>
        {/* //TODO: USER_ID IS HARDCODED */}
        <div className="flex flex-row justify-center">
          <Button
            className={`flex m-1 hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border ${
              activeTab === 'account' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`/users/${user_id}/details`)}
          >
            Account Details
          </Button>
          <Button
            className={`flex m-1 hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border ${
              activeTab === 'wishlist' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`/users/${user_id}/wishlist`)}
          >
            Wishlist
          </Button>
          <Button
            className={`flex m-1 hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border  ${
              activeTab === 'cart' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`/users/${userEmail}/cart`)}
          >
            Cart
          </Button>
          <Button
            className={`flex m-1 hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border  ${
              activeTab === 'orders' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`/users/${user_id}/orders`)}
          >
            Orders
          </Button>
        </div>
      </div>
      <main className="sm:w-4/5 mx-auto justify-center min-h-screen py-1">
        {activeTab === 'account' && <AccountDetails />}
        {activeTab === 'wishlist' && <Wishlist />}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'orders' && <Orders />}
      </main>
    </div>
  );
}

export default UserProfile;
