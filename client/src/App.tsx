import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/stores/store_id/products" element={<ProductsPage />} />
            {/* <Route path="/services/service_id" element={<StoresList />} /> */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
