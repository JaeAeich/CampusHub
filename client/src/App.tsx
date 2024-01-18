import LandingPage from './components/LandingPage';
import Login from './components/Login'
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return(
  <> 
  <BrowserRouter>
  <Routes>
   <Route path='/' element={ <LandingPage />} />;
   <Route path='/login' element={ <Login />} />;
   </Routes>
  </BrowserRouter>
  </>)
}

export default App;
