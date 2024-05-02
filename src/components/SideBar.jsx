import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { database } from "../config";
import { ref, onValue, off, push, set, get } from 'firebase/database';

const SideBar = ({ currentUser, onRoomChange, collapsed }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const roomsRef = ref(database, 'rooms');
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data: ", data);
      console.log("Check Current User Email: ", currentUser.email);
      if (data) {
        const roomList = [];
        for (const roomId in data) {
          const room = data[roomId];
          if (room.userEmail) {
            let emailExists = false;
            if (Array.isArray(room.userEmail)) {
              for (const email of room.userEmail) {
                if (email === currentUser.email) {
                  emailExists = true;
                  break;
                } 
              }
            } else {
              emailExists = room.userEmail === currentUser.email;
            }
            
            if (emailExists) {
              roomList.push(room.roomName);
            } else {
              console.log("Not pushed Room: ", room);
            }
          }
        }
        
        setRooms(roomList);
      }
    });

    return () => {
      off(roomsRef, 'value', unsubscribe);
    };
  }, [currentUser.email]);

  const handleAddRoom = async () => {
    const roomName = prompt('Enter the room name:');
    if (roomName) {
      try {
        const otherUserEmail = prompt('Enter the other user\'s email:');
        const roomRef = ref(database, 'rooms');
        const snapshot = await get(roomRef);
        const roomsData = snapshot.val();

        let roomToUpdate = null;
        for (const roomId in roomsData) {
          const room = roomsData[roomId];
          if (room.roomName === roomName && room.userEmail && (Array.isArray(room.userEmail) ? room.userEmail.includes(currentUser.email) : room.userEmail === currentUser.email)) {
            roomToUpdate = { ...room, roomId };
            break;
          }
        }

        if (roomToUpdate) {
          const updatedUserEmails = Array.isArray(roomToUpdate.userEmail) ? [...roomToUpdate.userEmail, otherUserEmail] : [roomToUpdate.userEmail, otherUserEmail];
          await set(ref(database, `rooms/${roomToUpdate.roomId}/userEmail`), updatedUserEmails);
          console.log('Successfully subscribed', otherUserEmail, 'to room:', roomName);
        } else {
          console.log('Room not found or you are not authorized:', roomName, ", roomToUpdate: ", roomToUpdate);
        }
      } catch (error) {
        console.log('Error subscribing user to room:', error);
      }
    }
  };


  const handleNewRoom = () => {
    const newRoomName = prompt('Enter the new room name:');
    if (newRoomName) {
      const newRoomRef = push(ref(database, `rooms`));
      set(newRoomRef, {
        roomId: newRoomRef.key,
        roomName: newRoomName,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        messages: [],
      });

      setRooms([...rooms, newRoomName]);

      console.log('New room created:', newRoomName);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    onRoomChange(room);
  };

  const sidebarClass = collapsed ? 'sidebar collapsed' : 'sidebar';

  return (
    <div className={sidebarClass}>
      <NavBar currentUser={currentUser}/>
      <div className='room-buttons'>
        <button className='add-button' onClick={handleAddRoom}>Add</button>
        <button className='new-button' onClick={handleNewRoom}>New</button>
      </div>
      <div className="room-list">
        <ul>
          {rooms.map((room, index) => (
            <li 
              key={index} 
              onClick={() => handleRoomClick(room)}
              className={selectedRoom === room ? 'selected-room' : 'unselected-room'}
            >
              {room}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
