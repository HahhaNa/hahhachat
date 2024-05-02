import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages, currentUser, currentRoom }) => {
  
  // Check if messages is undefined or null
  if (!messages) {
    return <div className="message-list">Start to chat now !</div>;
  }

  console.log("currentRoom: ", currentRoom);

  return (
    <div className="message-list-container">
      {currentRoom? <h3>{currentRoom}</h3>:<h3>Choose a ChatRoom</h3>}
      <div className="message-list"> 
        <ul>
          {messages.map((message, index) => (
            <Message key={index} currentRoom={currentRoom} message={message} currentUser={currentUser} /> 
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageList;
