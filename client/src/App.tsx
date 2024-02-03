import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Landing from './components/Landing';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import ProductPage from './components/ProductPage';
import StorePage from './components/StoresPage';
import Login from './components/Login';
import { Toaster } from './components/ui/toaster';

function App() {
  const isVisible = !window.location.pathname.includes('/login');
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {isVisible && <Navbar />}
        <div className="flex grow">
          <Toaster />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/stores/:store_id/products" element={<ProductsPage />} />
            <Route path="/stores/:store_id/products/:product_id" element={<ProductPage />} />
            <Route path="/services/:service_id/stores" element={<StorePage />} />
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
