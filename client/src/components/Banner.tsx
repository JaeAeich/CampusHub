import React from 'react';

function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <h2 className="menu-title">Trending in your Campus</h2>

        <div className="slider-container has-scrollbar">
          <div className="slider-item">
            <img src="./images/ccd.png" alt="women's latest fashion sale" className="banner-img" />
          </div>

          <div className="slider-item">
            <img src="./images/banner-2.jpg" alt="modern sunglasses" className="banner-img" />

            <div className="banner-content">
              <p className="banner-subtitle">Trending Store</p>

              <h2 className="banner-title">Shopping Complex, IIT Bhilai</h2>

              <p className="banner-text">
                starting at <b>100</b>.00 /-
              </p>

              <a href="#" className="banner-btn">
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
