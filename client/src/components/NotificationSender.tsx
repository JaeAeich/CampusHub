// NotificationSender.js
import { useState } from 'react';
// import axios from 'axios';

export default function NotificationSender() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await fetch('http://localhost:8081/campus_hub/v1/notification', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           from,
           to,
           message,
         }),
       });
   
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
   
       // Assuming you want to do something with the response, like logging it
       const data = await response.json();
       console.log(data);
   
       setFrom('');
       setTo('');
       setMessage('');
    } catch (error) {
       console.error('Error sending notification:', error);
    }
   };
   

  return (
    <div>
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <label>
          From:
          <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <br />
        <label>
          To:
          <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <br />
        <label>
          Message:
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
