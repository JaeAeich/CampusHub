import React, { useState, useEffect } from 'react';

const NotificationComponent = ({ userType }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from backend when component mounts
    fetchNotifications(userType);
  }, [userType]);

  const fetchNotifications = async (type) => {
    try {
      const response = await fetch(`/api/notifications/${type}`);
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div>
      <h2>Notifications for {userType}</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <NotificationComponent userType="user" />
      <NotificationComponent userType="seller" />
    </div>
  );
};

export default App;
