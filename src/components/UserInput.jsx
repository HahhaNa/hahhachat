import React, { useState } from 'react';
import { database } from '../config.js';
import { ref, push, set } from "firebase/database";

const UserInput = ({ currentUser, currentRoom }) => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    var time = new Date().getTime();
    if (inputText !== null) {
        const messagesRef = ref(database, `rooms/${currentRoom}/messages`);
        const newMessageRef = push(messagesRef, {
            text: inputText,
            timestamp: time,
            senderId: currentUser.uid,
            senderName: currentUser.displayName,
        });
        set(newMessageRef, {
            text: inputText,
            timestamp: time,
            senderId: currentUser.uid,
            senderName: currentUser.displayName,
        }, error => {
            if (error) {
                setError(error.message);
            } else {
                setInputText('');
            }
        });
    }
  };

  return (
    <div className="input">
      <form className="user-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <div className='send'>
          <button type="submit">Send</button>  
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};


export default UserInput;
