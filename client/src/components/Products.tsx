import React from 'react';
import { products } from '../assets/constants';

function Products() {
  return (
    // product-container, container,  product-box
    <div className="product-main">
      <h2 className="title">New Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="showcase">
            <div className="showcase-banner">
              <img
                src={product.images[0]}
                alt={product.title}
                width="300"
                className="product-img default"
              />
              <img
                src={product.images[1]}
                alt={product.title}
                width="300"
                className="product-img hover"
              />
              {product.badge && <p className="showcase-badge">{product.badge}</p>}
              <div className="showcase-actions">
                <span className="material-symbols-outlined nav-icon nav-icon-search">favorite</span>
                <span className="material-symbols-outlined nav-icon nav-icon-search">
                  shopping_bag
                </span>
              </div>
            </div>
            <div className="showcase-content">
              <a href="#" className="showcase-category">
                {product.category}
              </a>
              <a href="#">
                <h3 className="showcase-title">{product.title}</h3>
              </a>
              <div className="showcase-rating">{/* Add star icons based on product rating */}</div>
              <div className="price-box">
                <p className="price">${product.price.toFixed(2)}</p>
                {product.discountedPrice && <del>${product.discountedPrice.toFixed(2)}</del>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
