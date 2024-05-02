import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import MessageList from './MessagesList.jsx';
import UserInput from './UserInput.jsx';

const Chat = ({ currentUser, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [lastMessageText, setLastMessageText] = useState(null);

  useEffect(() => {
    const database = getDatabase();
    const roomMessagesRef = ref(database, `rooms/${currentRoom}/messages`);

    const fetchData = onValue(roomMessagesRef, (snapshot) => {
        const messagesData = snapshot.val();
        if (messagesData) {
            const messagesArray = Object.keys(messagesData).map((messageId) => ({
                id: messageId,
                ...messagesData[messageId],
            }));
            setMessages(messagesArray);

            // Check if the last message is not sent by the current user to avoid notifying for own messages
            const lastMessage = messagesArray[messagesArray.length - 1];
            if (lastMessage.senderId !== currentUser.uid && lastMessage.text !== lastMessageText) {
                // Show notification
                showNotification(lastMessage.text, currentRoom);
                setLastMessageText(lastMessage.text); // Store the last message text to avoid continuous notifications for the same message
            }
        } else {
            setMessages([]);
        }
    });

    return () => {
        off(roomMessagesRef, 'value', fetchData);
    };
}, [currentRoom, currentUser, lastMessageText]);

  // Function to show notification
  const showNotification = (messageText, roomName) => {
    if (Notification.permission === 'granted') {
      new Notification('New Message', {
        body: `From ${roomName}: ${messageText}`,
        icon: 'path_to_your_icon.png'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('New Message', {
            body: `From ${roomName}: ${messageText}`,
            icon: 'path_to_your_icon.png'
          });
        }
      });
    }
  };

  return (
    <div className='chat'>
      <MessageList currentRoom={currentRoom} messages={messages} currentUser={currentUser} />
      <UserInput currentRoom={currentRoom} currentUser={currentUser} />
    </div>
  );
};

export default Chat;
