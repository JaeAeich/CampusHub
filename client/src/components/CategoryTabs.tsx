import React from 'react';
import { categories } from '../assets/constants.ts';

function CategoryTabs() {
  return (
    <div className="category">
      <div className="container">
        <div className="category-item-container has-scrollbar">
          {categories.map((category) => (
            <div className="category-item">
              <div className="category-img-box">
                <img src={category['image']} alt={category['name']} width="30" />
              </div>

              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">{category['name']}</h3>

                  <p className="category-item-amount">{category['quantity']}</p>
                </div>

                <a href="#" className="category-btn">
                  Show all
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryTabs;
