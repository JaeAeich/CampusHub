/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';

export default function WebSocketCall({ socket }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    socket.emit('data', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('data', (data: any) => {
      setMessages([...messages, data.data]);
    });
    return () => {
      socket.off('data', () => {
        console.log('data event was removed');
      });
    };
  }, [socket, messages]);

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <input type="text" value={message} onChange={handleText} />
      <button type="button" onClick={handleSubmit}>
        submit
      </button>
      <ul>
        {messages.map((message, ind) => {
          return <li key={ind}>{message}</li>;
        })}
      </ul>
    </div>
  );
}
