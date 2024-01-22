import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StoresList from './components/StoresList';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen justify-between">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services/service_id" element={<StoresList/>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
