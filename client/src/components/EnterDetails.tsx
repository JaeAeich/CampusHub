import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import { Button } from './ui/button';
import CreateAccount from './CreateAccount';

function EnterDetails({ active }: { active: string }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(active);
  const { user } = useAuth0();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/create${tab}/${user?.email}`);
    window.location.reload();
  };

  return (
    <div className="bg-background w-full :gap-5 px-3 lg:pr-10 lg:flex-row text-primary py-5 pb-10">
      <div className="flex flex-col gap-2 w-full p-4 text-sm border-secondary top-12">
        <h2 className="text-center mx-auto md:text-2xl font-semibold text-xl">
          Create your account
        </h2>
        <div className="flex flex-row justify-center">
          <Button
            className={`flex m-1 hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border ${
              activeTab === 'user' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`user`)}
          >
            User
          </Button>
          <Button
            className={`flex m-1 hover:bg-accentDark hover:text-background items-center px-3 py-2.5 font-bold bg-background  text-primary border ${
              activeTab === 'seller' ? 'bg-accent text-background' : ''
            }`}
            onClick={() => handleTabClick(`seller`)}
          >
            Seller
          </Button>
        </div>
      </div>
      <main className="sm:w-4/5 mx-auto justify-center h-auto">
        {activeTab === 'user' && <CreateAccount />}
        {activeTab === 'seller' && <Login />}
      </main>
    </div>
  );
}

export default EnterDetails;
