import React from 'react';
import '../assets/css/style-prefix.css';
import '../assets/css/style.css';
import DealOfTheDay from './DealOfTheDay';
import Banner from './Banner';
import Navbar from './Navbar';
import ServiceCards from './ServiceCards';
import Footer from './Footer';
import MiniProducts from './MiniProducts';

function Landing() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="container">
          <Banner />
          <DealOfTheDay />
          <ServiceCards />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
