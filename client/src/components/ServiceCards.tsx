import React from 'react';
import { services } from '../assets/constants.ts';
function ServiceCards() {
  return (
    // Main page service cards
    <div className="blog">
      <h2 className="menu-title">Services in your campus</h2>
      <div className="blog-container has-scrollbar">
        {services.map((service) => (
          <div className="blog-card">
            <a href="#">
              <img
                src={service['image']}
                alt={service['name']}
                width="300"
                height="300"
                className="blog-banner"
              />
            </a>

            <div className="blog-content">
              <a href="#" className="blog-category">
                {' '}
                {service['name']}
              </a>

              <a href="#">
                <h3 className="blog-title"></h3>
              </a>

              <p className="blog-meta"></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCards;
