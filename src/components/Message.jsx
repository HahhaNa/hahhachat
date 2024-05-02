import React from 'react';

const Message = ({ message, currentUser, currentRoom, smaller }) => {
  const isCurrentUserMessage = currentUser.uid === message.senderId;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${dateString} ${timeString}`;
  };

  const messageClass = isCurrentUserMessage ? "darker message" : "message";

  return (
    <div className={messageClass} >
      <img className={isCurrentUserMessage ? "right" : "left"} src="https://icons.veryicon.com/png/o/transport/car-function-button/user-136.png" alt="pic" />
      <p>{message.text}</p>
      <span className={isCurrentUserMessage ? 'time-right' : 'time-left'}>{formatTimestamp(message.timestamp)}</span>
    </div>
  );
};

export default Message;
