import React, { useState } from 'react';

function Navbar() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const mobileMenuOpenFunc = (index) => {
    setActiveMenuIndex(index);
  };

  const mobileMenuCloseFunc = () => {
    setActiveMenuIndex(null);
  };

  return (
    // Navbar for phone and desktop
    <header>
      <div className="overlay" data-overlay></div>
      <div className="header-main">
        <div className="container">
          <a href="#" className="header-logo">
            <h2 className="navLogo">CampusHub</h2>
          </a>

          <div className="header-search-container">
            <input
              type="search"
              name="search"
              className="search-field"
              placeholder="Enter your product name..."
            />

            <button className="search-btn">
              <span className="material-symbols-outlined nav-icon nav-icon-search">Search</span>
            </button>
          </div>

          <div className="header-user-actions">
            <button className="action-btn">
              <span className="material-symbols-outlined nav-icon">person</span>
            </button>

            <button className="action-btn">
              <span className="material-symbols-outlined nav-icon">Favorite</span>
              <span className="count">0</span>
            </button>

            <button className="action-btn">
              <span className="material-symbols-outlined nav-icon">shopping_bag</span>
              <span className="count">0</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="desktop-navigation-menu">
        <div className="container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category">
              <a href="#" className="menu-title">
                Home
              </a>
            </li>
            <li className="menu-category">
              <a href="#" className="menu-title">
                Food
              </a>
            </li>
            <li className="menu-category">
              <a href="#" className="menu-title">
                Electronics
              </a>
            </li>
            <li className="menu-category">
              <a href="#" className="menu-title">
                Laundry
              </a>
            </li>
            <li className="menu-category">
              <a href="#" className="menu-title">
                Pharmacy
              </a>
            </li>
            <li className="menu-category">
              <a href="#" className="menu-title">
                Thrift Store
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="mobile-bottom-navigation">
        <button className="action-btn" data-mobile-menu-open-btn>
          <span className="material-symbols-outlined">person</span>
        </button>

        <button className="action-btn">
          <span className="material-symbols-outlined">shopping_bag</span>

          <span className="count">0</span>
        </button>

        <button className="action-btn">
          <span className="material-symbols-outlined">home</span>
        </button>

        <button className="action-btn">
          <span className="material-symbols-outlined">favorite</span>
          <span className="count">0</span>
        </button>

        <button className="action-btn" data-mobile-menu-open-btn>
          <span className="material-symbols-outlined">apps</span>
        </button>
      </div>

      <nav className="mobile-navigation-menu  has-scrollbar" data-mobile-menu>
        <div className="menu-top">
          <h2 className="menu-title">Menu</h2>

          <button className="menu-close-btn" data-mobile-menu-close-btn>
            <span className="material-symbols-outlined">Close</span>
          </button>
        </div>

        <ul className="mobile-menu-category-list">
          <li className="menu-category">
            <a href="#" className="menu-title">
              Home
            </a>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Men's</p>

              <div>
                <span className="material-symbols-outlined">Add</span>
                <span className="material-symbols-outlined">Remove</span>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Shirt
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Shorts & Jeans
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Safety Shoes
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Wallet
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Women's</p>

              <div>
                <span className="material-symbols-outlined">Add</span>
                <span className="material-symbols-outlined">Remove</span>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Dress & Frock
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Earrings
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Necklace
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Makeup Kit
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Jewelry</p>

              <div>
                <span className="material-symbols-outlined">Add</span>
                <span className="material-symbols-outlined">Remove</span>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Earrings
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Couple Rings
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Necklace
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Bracelets
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Perfume</p>

              <div>
                <span className="material-symbols-outlined">Add</span>
                <span className="material-symbols-outlined">Remove</span>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Clothes Perfume
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Deodorant
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Flower Fragrance
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Air Freshener
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="menu-bottom">
          <ul className="menu-category-list">
            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Language</p>

                <span className="material-symbols-outlined">Arrow Back IOS</span>
              </button>

              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    English
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    Espa&ntilde;ol
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    Fren&ccedil;h
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Currency</p>
                {/* <ion-icon name="caret-back-outline" className="caret-back"></ion-icon> */}
              </button>

              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    USD &dollar;
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    EUR &euro;
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
