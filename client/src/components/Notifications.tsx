import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const NOTIFICATION_BASE_URL = import.meta.env.VITE_NOTIFICATIONS_BASE_URL;
const socket = io(NOTIFICATION_BASE_URL, { transports: ['websocket'] });

function Notifications() {
  const sellerExists = useSelector((state: RootState) => state.seller.sellerId);
  const sellerId = useSelector((state: RootState) => state.seller.sellerId);
  const userId = useSelector((state: RootState) => state.auth.user_id);
  const [eventName, setEventName] = useState('');
  const [notification, setNotification] = useState<string[]>([]);

  useEffect(() => {
    if (sellerExists) {
      setEventName(sellerId);
    } else {
      setEventName(userId);
    }
  }, [sellerExists, sellerId, userId, eventName]);

  useEffect(() => {
    // Listen for notifications
    socket.on(eventName, (data: { message: string }) => {
      const notif = notification;
      notif.push(data.message);
      setNotification(notif);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div>
      {notification.map((notif) => (
        <div key={notif}>{notif}</div>
      ))}
    </div>
  );
}

export default Notifications;
