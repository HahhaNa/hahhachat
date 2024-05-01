import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      <h2>Message List</h2>
      <ul>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
