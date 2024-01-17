import React from 'react';
import { miniProducts } from '../assets/constants';

const MiniProducts = () => {
  return (
    <>
      {/* Products list for orders */}
      <div className="product-box">
        <div className="product-minimal">
          <div className="product-showcase">
            <h2 className="title">New Arrivals</h2>
            <div className="showcase-wrapper has-scrollbar">
              <div className="showcase-container">
                {/* Use map to iterate over productData */}
                {miniProducts.map((product, index) => (
                  <div className="showcase" key={index}>
                    <a href="#" className="showcase-img-box">
                      <img
                        src={product.imgSrc}
                        alt={product.alt}
                        width="70"
                        className="showcase-img"
                      />
                    </a>
                    <div className="showcase-content">
                      <a href="#">
                        <h4 className="showcase-title">{product.title}</h4>
                      </a>
                      <a href="#" className="showcase-category">
                        {product.category}
                      </a>
                      <div className="price-box">
                        <p className="price">{product.price}</p>
                        <del>{product.discount}</del>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniProducts;
