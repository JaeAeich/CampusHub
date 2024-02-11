import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import Landing from './components/Landing';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import ProductPage from './components/ProductPage';
import StorePage from './components/StoresPage';
import Login from './components/Login';
import { Toaster } from './components/ui/toaster';
import UserProfile from './components/UserProfile';
import CreateAccount from './components/CreateAccount';
import { RootState } from './store/store';

function App() {
  const isVisible = !window.location.pathname.includes('/login');
  const { isAuthenticated } = useAuth0();
  const userExists = useSelector((state: RootState) => state.auth.value);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {isVisible && <Navbar />}
        <div className="flex grow">
          <Toaster />
          <Routes>
            {!userExists && <Route path="/create/:user_email" element={<CreateAccount />} />}
            {userExists && (
              <>
                <Route path="/users/:user_id/details" element={<UserProfile active="account" />} />
                <Route
                  path="/users/:user_id/wishlist"
                  element={<UserProfile active="wishlist" />}
                />
                <Route path="/users/:user_id/cart" element={<UserProfile active="cart" />} />
                <Route path="/users/:user_id/orders" element={<UserProfile active="orders" />} />
                <Route path="/login" element={<Login />} />
              </>
            )}
            <Route path="/stores/:store_id/products" element={<ProductsPage />} />
            <Route path="/stores/:store_id/products/:product_id" element={<ProductPage />} />
            <Route path="/services/:service_id/stores" element={<StorePage />} />
            <Route path="/products/:search_query" element={<ProductsPage />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Error404 />} />
            {/* Routes that should be behind auth0 login wall */}
            {isAuthenticated && <Route path="/seller/register" element={<Login />} />}
          </Routes>
        </div>
        {isVisible && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
