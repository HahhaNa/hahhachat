import React from 'react';

const Message = ({ message }) => {
  return (
    <li className="message">
      <p>{message.text}</p>
      <span>{message.timestamp}</span>
    </li>
  );
};

export default Message;
