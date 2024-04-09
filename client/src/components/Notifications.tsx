import { useSelector } from 'react-redux';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RootState } from '../store/store';

function Notifications() {
  // const sellerExists = useSelector((state: RootState) => state.seller.sellerId);
  // const sellerId = useSelector((state: RootState) => state.seller.sellerId);
  // const userId = useSelector((state: RootState) => state.auth.user_id);
  const notif = useSelector((state: RootState) => state.Notification.notification);
  // // eslint-disable-next-line
  // const [notification, setNotification] = useState<any[]>([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   let eventName = '';
  //   if (sellerExists) {
  //     eventName = 'user';
  //   } else {
  //     eventName = 'seller';
  //   }

  //   // Listen for notifications
  //   socket.on(eventName, (data) => {
  //     dispatch(setNotifications(data));
  //     console.log(notif);
  //     // Use the updater function to ensure the latest state
  //     setNotification((prevNotifications) => [...prevNotifications, data]);
  //   });

  //   // Clean up socket listeners on component unmount
  //   return () => {
  //     socket.off(eventName);
  //   };
  // }, []);

  // useEffect(() => {
  //   // On initial load, emit an event to trigger notification retrieval
  //   let eventName = '';
  //   if (sellerExists) {
  //     eventName = sellerId;
  //   } else {
  //     eventName = userId;
  //   }
  //   socket.emit('get_notifications', eventName);
  // }, [sellerExists, sellerId, userId]);

  return (
    <div className="w-full">
      <div className="text-xl font-bold header text-center p-4">All your notifications!</div>
      {notif.map((n, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Alert key={index}>
          {
            // eslint-disable-next-line
            Object.values(n).map((mess: any, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <AlertDescription key={index} className="alert-description">
                {mess}
              </AlertDescription>
            ))
          }
        </Alert>
      ))}
    </div>
  );
}

export default Notifications;
