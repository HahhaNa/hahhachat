import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import MessageList from './MessagesList.jsx';
import UserInput from './UserInput.jsx';

const Chat = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const database = getDatabase(); // Initialize Firebase database
    const messagesRef = ref(database, 'messages');

    const fetchData = onValue(messagesRef, (snapshot) => {
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
      off(messagesRef, 'value', fetchData);
    };
  }, []);

  return (
    <div className='chat'>
      <MessageList messages={messages} currentUser={currentUser} />
      <UserInput currentUser={currentUser} />
    </div>
  );
};

export default Chat;
