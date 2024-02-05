import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountDetails from './AccountDetails';
import Wishlist from './Wishlist';
import PastOrders from './PastOrders';
import { Button } from './ui/button';

const user_id = 1;

function UserProfile({ active }: { active: string }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(active);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(tab); // Navigate to the selected tab route
    window.location.reload();
  };

  return (
    <div className="bg-background w-full flex flex-col lg:gap-5 px-3 lg:pr-10 lg:flex-row text-primary">
      <aside className="lg:py-4 xl:w-1/5 lg:w-1/4 lg:block">
        <div className="flex flex-col gap-2 w-full p-4 text-sm h-1/2 lg:border-r border-secondary top-12">
          <h2 className="pl-3 mb-4 text-xl font-bold font-heading lg:justify-left lg:mx-0 justify-center mx-auto">
            My Account
          </h2>
          {/* //TODO: USER_ID IS HARDCODED */}
          <Button
            className={`flex  hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border ${
              activeTab === 'account' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`/users/${user_id}/details`)}
          >
            Account Details
          </Button>
          <Button
            className={`flex hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border ${
              activeTab === 'wishlist' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`/users/${user_id}/wishlist`)}
          >
            Wishlist
          </Button>
          <Button
            className={`flex hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border  ${
              activeTab === 'orders' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`/users/${user_id}/orders`)}
          >
            Past Orders
          </Button>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 xl:w-4/5 lg:w-3/4">
        {activeTab === 'account' && <AccountDetails />}
        {activeTab === 'wishlist' && <Wishlist />}
        {activeTab === 'orders' && <PastOrders />}
      </main>
    </div>
  );
}

export default UserProfile;
