import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import ProductPage from './components/ProductPage';
import StorePage from './components/StoresPage';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import SellerDashboard from './components/SellerDashboard';
// import SellerProfile from './components/SellerProfile';
import StoreDetails from './components/StoreDetails';
import SellerStoreListPage from './components/SellerStoreList';
import SellerOrderList from './components/SellerListOrders';

function App() {
  const isVisible = !window.location.pathname.includes('/login');
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {isVisible && <Navbar />}
        <div className="flex grow">
          <Routes>
            <Route path="/users/:user_id/details" element={<UserProfile active="account" />} />
            <Route path="/users/:user_id/wishlist" element={<UserProfile active="wishlist" />} />
            <Route path="/users/:user_id/cart" element={<UserProfile active="cart" />} />
            <Route path="/users/:user_id/orders" element={<UserProfile active="orders" />} />
            <Route path="/" element={<Landing />} />
            <Route path="/stores/:store_id/products" element={<ProductsPage />} />
            <Route path="/stores/:store_id/products/:product_id" element={<ProductPage />} />
            <Route path="/services/:service_id/stores" element={<StorePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stores" element={<StoreDetails />} />
            <Route path="/stores/:store_id/dashboard" element={<SellerDashboard/>} />
            <Route path="/stores/:store_id/orders" element={<SellerOrderList/>} />
            <Route path="/sellers/:seller_id/stores" element={<SellerStoreListPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        {isVisible && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
