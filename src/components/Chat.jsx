import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import MessageList from './MessagesList.jsx';
import UserInput from './UserInput.jsx';

const Chat = ({ currentUser, currentRoom }) => {
  const [messages, setMessages] = useState([]);

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
        } else {
            setMessages([]);
        }
    });

    return () => {
        off(roomMessagesRef, 'value', fetchData);
    };
}, [currentRoom]);


  return (
    <div className='chat'>
      <MessageList currentRoom={currentRoom} messages={messages} currentUser={currentUser} />
      <UserInput currentRoom={currentRoom} currentUser={currentUser} />
    </div>
  );
};

export default Chat;