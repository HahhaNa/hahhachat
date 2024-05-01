import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages, currentUser }) => {
  
  // Check if messages is undefined or null
  if (!messages) {
    return <div className="message-list">No messages to display</div>;
  }

  return (
    <div className="message-list-container">
      <h2>Message List</h2>
      <div className="message-list"> 
        <ul>
          {messages.map((message, index) => (
            <Message key={index} message={message} currentUser={currentUser} /> 
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageList;
