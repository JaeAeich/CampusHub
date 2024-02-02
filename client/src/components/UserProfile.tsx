import { useState } from 'react';
import AccountDetails from './AccountDetails';
import Wishlist from './Wishlist';
import PastOrders from './PastOrders';
import { Button } from './ui/button';

function UserProfile({ active }: { active: string }) {
  const [activeTab, setActiveTab] = useState(active);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-background w-full flex flex-col md:gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-primary">
      <aside className="md:py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-secondary top-12">
          <h2 className="pl-3 mb-4 text-xl font-bold font-heading md:justify-left md:mx-0 justify-center mx-auto">
            My Account
          </h2>
          <Button
            className={`flex  hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border rounded-full ${
              activeTab === 'account' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick('account')}
          >
            Account Details
          </Button>
          <Button
            className={`flex hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border rounded-full ${
              activeTab === 'wishlist' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick('wishlist')}
          >
            Wishlist
          </Button>
          <Button
            className={`flex hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border rounded-full ${
              activeTab === 'orders' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick('orders')}
          >
            Past Orders
          </Button>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        {activeTab === 'account' && <AccountDetails />}
        {activeTab === 'wishlist' && <Wishlist />}
        {activeTab === 'orders' && <PastOrders />}
      </main>
    </div>
  );
}

export default UserProfile;
