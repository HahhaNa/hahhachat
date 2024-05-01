import React from 'react';

const Message = ({ message, currentUser }) => {
  // Check if the currentUser matches the user of the message
  const isCurrentUserMessage = currentUser.uid === message.senderId;
  
  // Function to format timestamp to date, hour, second
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp); // Convert seconds to milliseconds
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${dateString} ${timeString}`;
  };

  if(isCurrentUserMessage) {
    return (
      <div className="darker message">
        <img className="right" src="https://icons.veryicon.com/png/o/transport/car-function-button/user-136.png" alt="pic" />
        <p>{message.text}</p>
        <span className='time-right'>{formatTimestamp(message.timestamp)}</span>
      </div>
    )
  } else {
    console.log("currentUser.uid: ", currentUser.uid, ", message.senderID: ", message.senderID);
  }
};

export default Message;
