import React, { useState } from 'react';
import { database } from '../config.js';
import { ref, push, set } from "firebase/database";

const UserInput = ({ currentUser }) => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    var time = new Date().getTime();
    if (inputText !== null) {
      console.log(
        currentUser.uid,
        currentUser.displayName,
        time,
        inputText,
      );
      const messagesRef = ref(database, 'messages');
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
      },
      setInputText('')
      , error => {
        if (error) {
          setError(error.message);
        } else {
          setInputText('');
        }
      }
      );
    }
  };

  return (
    <div className="input">
      <form className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <div className='send'>
          <button type="submit" onClick={handleSubmit}>Send</button>  
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserInput;
