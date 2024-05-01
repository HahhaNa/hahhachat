import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Chat from '../components/Chat';
import { auth } from '../config';

const Home = () => {
    const user = auth.currentUser;
    const [currentRoom, setCurrentRoom] = useState(null);

    useEffect(() => {
        // Here you can perform any side effects based on the currentRoom
        console.log("Current Room:", currentRoom);
    }, [currentRoom]);

    const handleRoomChange = (room) => {
        setCurrentRoom(room);
    };

    return (
        <div className='home'>
            <div className='container'>
                <SideBar currentUser={user} onRoomChange={handleRoomChange} />
                <Chat currentUser={user} currentRoom={currentRoom} />
            </div>
        </div>
    );
};

export default Home;
