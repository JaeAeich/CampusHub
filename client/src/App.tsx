import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import ProductPage from './components/ProductPage';
import StorePage from './components/StoresPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/stores/:store_id/products" element={<ProductsPage />} />
            <Route path="/stores/:store_id/products/:product_id" element={<ProductPage />} />
            <Route path="/services/:service_id/stores" element={<StorePage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
