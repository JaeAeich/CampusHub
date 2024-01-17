import React from 'react';

function Notification() {
  return (
    // Notification
    <div className="notification-toast" data-toast>
      <button className="toast-close-btn" data-toast-close>
        <span className="material-symbols-outlined nav-icon nav-icon-search">Close</span>
      </button>

      <div className="toast-banner">
        <img
          src="./images/products/jewellery-1.jpg"
          alt="Rose Gold Earrings"
          width="80"
          height="70"
        />
      </div>

      <div className="toast-detail">
        <p className="toast-message">Someone in your campus just bought</p>

        <p className="toast-title">Crispy Masala Dosa</p>

        <p className="toast-meta">
          <time dateTime="PT2M">2 Minutes</time> ago
        </p>
      </div>
    </div>
  );
}

export default Notification;
