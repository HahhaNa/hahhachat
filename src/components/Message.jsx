import React from 'react';

const Message = ({ message, currentUser, currentRoom }) => {
  // Check if the currentUser matches the user of the message
  console.log("In Message: ", message);
  const isCurrentUserMessage = currentUser.uid === message.senderId;
  console.log("currentUser.uid: ", currentUser.uid, ", message.senderId: ", message.senderId);
  
  // Function to format timestamp to date, hour, second
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp); // Convert seconds to milliseconds
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${dateString} ${timeString}`;
  };

  // Display message only if it belongs to the current room
  if (currentRoom.roomId === message.roomId) {
    if (isCurrentUserMessage) {
      return (
        <div className="darker message">
          <img className="right" src="https://icons.veryicon.com/png/o/transport/car-function-button/user-136.png" alt="pic" />
          <p>{message.text}</p>
          <span className='time-right'>{formatTimestamp(message.timestamp)}</span>
        </div>
      );
    } else {
      return (
        <div className="message">
          <img className="left" src="https://icons.veryicon.com/png/o/transport/car-function-button/user-136.png" alt="pic" />
          <p>{message.text}</p>
          <span className='time-left'>{formatTimestamp(message.timestamp)}</span>
        </div>
      );
    }
  } else {
    return null; // Message doesn't belong to the current room, so don't render it
  }
};


export default Message;
