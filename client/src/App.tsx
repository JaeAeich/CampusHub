import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import ProductPage from './components/ProductPage';
import StorePage from './components/StoresPage';
import { Toaster } from './components/ui/toaster';
import UserProfile from './components/UserProfile';
import { RootState } from './store/store';
import NotFound from './components/NotFound';
import EnterDetails from './components/EnterDetails';
import CreateAccount from './components/CreateAccount';
import SellerDashboard from './components/SellerDashboard';
// import SellerProfile from './components/SellerProfile';
import StoreDetails from './components/StoreDetails';
import SellerStoreListPage from './components/SellerStoreList';
import StoreOrderList from './components/StoreOrderList';
import StoreReviews from './components/StoreReviews';
import StoreInventory from './components/StoreInventory';
import Notifications from './components/Notifications';
import ProductDetails from './components/ProductDetails';

function App() {
  // const isVisible = !window.location.pathname.includes('/login');
  const { user, isAuthenticated } = useAuth0();
  const userExists = useSelector((state: RootState) => state.auth.value);
  const sellerAuth = useSelector((state: RootState) => state.seller.sellerAuth);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* {isVisible && <Navbar />} */}
        <div className="flex grow">
          <Toaster />
          <Routes>
            <Route path="/notifications" element={<Notifications />} />
            {isAuthenticated && !userExists && !sellerAuth && (
              <>
                <Route path="/createuser/:email_id" element={<EnterDetails active="user" />} />
                <Route path="/createseller/:email_id" element={<EnterDetails active="seller" />} />
              </>
            )}
            {isAuthenticated && userExists && (
              <>
                <Route path="/seller/register" element={<Login />} />
                <Route
                  path="/users/:user_id/details"
                  element={<UserProfile userEmail={user?.email} active="account" />}
                />
                <Route
                  path="/users/:user_id/wishlist"
                  element={<UserProfile userEmail={user?.email} active="wishlist" />}
                />
                <Route
                  path="/users/:user_email/cart"
                  element={<UserProfile userEmail={user?.email} active="cart" />}
                />
                <Route
                  path="/users/:user_id/orders"
                  element={<UserProfile userEmail={user?.email} active="orders" />}
                />
              </>
            )}
            {isAuthenticated && sellerAuth && (
              <>
                <Route path="/sellers/:seller_id/dashboard" element={<SellerDashboard />} />
                <Route path="/user/register" element={<CreateAccount />} />
                <Route path="/sellers/:seller_id/createstore" element={<StoreDetails />} />
                <Route path="/stores/:store_id/createproduct" element={<ProductDetails />} />
                <Route path="/stores/:store_id/dashboard" element={<SellerDashboard />} />
                <Route path="/stores/:store_id/orders" element={<StoreOrderList />} />
                <Route path="/stores/:store_id/reviews" element={<StoreReviews />} />
                <Route path="/stores/:store_id/inventory" element={<StoreInventory />} />
                <Route path="/sellers/:seller_id/stores" element={<SellerStoreListPage />} />
              </>
            )}
            <Route path="/stores/:store_id/products" element={<ProductsPage />} />
            <Route path="/stores/:store_id/products/:product_id" element={<ProductPage />} />
            <Route path="/services/:service_id/stores" element={<StorePage />} />
            <Route path="/products/:search_query" element={<ProductsPage />} />
            <Route path="/" element={<Landing />} />
            <Route
              path="*"
              element={
                <div className="my-auto item-center mx-auto text-center">
                  <NotFound item="Page" />
                </div>
              }
            />
            {/* Routes that should be behind auth0 login wall */}
          </Routes>
        </div>
        <Footer />
        {/* {isVisible && <Footer />} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
