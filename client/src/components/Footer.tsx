import React from 'react';
import { services } from '../assets/constants';

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-nav">
          <div className="container">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Services</h2>
              </li>

              {services.map((service) => (
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    {service['name']}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Our Services</h2>
              </li>

              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Trending Stores
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Offers
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Services
                </a>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">OUR COMPANY</h2>
              </li>

              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Home
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Why us?
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  About Us
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Testimonial
                </a>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Contact</h2>
              </li>

              <li className="footer-nav-item flex">
                <div className="icon-box">
                  {/* <ion-icon name="location-outline"></ion-icon> */}
                </div>

                <address className="content">
                  IIT Bhilai, Kutelabhata Village, Chhattisgarh 491001
                </address>
              </li>

              <li className="footer-nav-item flex">
                <div className="icon-box">{/* <ion-icon name="call-outline"></ion-icon> */}</div>

                <a href="tel:+91 99999-99999" className="footer-nav-link">
                  (+91) 99999-99999
                </a>
              </li>

              <li className="footer-nav-item flex">
                <div className="icon-box">{/* <ion-icon name="mail-outline"></ion-icon> */}</div>

                <a href="mailto:campushub@iitbhilai.ac.in" className="footer-nav-link">
                  campushub@iitbhilai.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <a href="#" className="header-logo">
              <h2 className="navLogo">CampusHub</h2>
            </a>

            <p className="copyright">
              Copyright &copy; <a href="#">Team Runaways</a> all rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
