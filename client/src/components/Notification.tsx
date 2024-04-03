import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import WebSocketCall from './WebSocketCall';
import HttpCall from './HttpCall';

export default function Notification() {
  const [socketInstance, setSocketInstance] = useState('');
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io('localhost:8081/campus_hub/v1', {
        transports: ['websocket'],
        cors: {
          origin: '*',
        },
      });

      setSocketInstance(socket);

      socket.on('connect', (data) => {
        console.log(data);
      });

      setLoading(false);

      socket.on('disconnect', (data) => {
        console.log(data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [buttonStatus]);

  return (
    <div className="App">
      <h1>React/Flask App + socket.io</h1>
      <div className="line">
        <HttpCall />
      </div>
      {!buttonStatus ? (
        <button type="button" onClick={handleClick}>
          turn chat on
        </button>
      ) : (
        <>
          <button type="button" onClick={handleClick}>
            turn chat off
          </button>
          <div className="line">{!loading && <WebSocketCall socket={socketInstance} />}</div>
        </>
      )}
    </div>
  );
}
