import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Chat from '../components/Chat';
import { auth } from '../config';
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const user = auth.currentUser;
    const [currentRoom, setCurrentRoom] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();
    if(!user) {
        navigate("register");
        console.log("Want Navigate");
    }
    console.log("In HOME user: ", user);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setCollapsed(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleRoomChange = (room) => {
        setCurrentRoom(room);
        if(windowWidth <= 768) {
            setCollapsed(true);    
        }
    };

    const toggleSidebar = () => {
        setCollapsed(collapsed^1);
    };

    return (
        <div className='home'>
            <div className='container'>
                <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                    <img src="https://www.svgrepo.com/show/310451/apps-list.svg" alt="Toggle" />
                </button>
                {windowWidth > 768 ? (
                    <>
                        {!collapsed && <SideBar currentUser={user} onRoomChange={handleRoomChange} />}
                        <Chat currentUser={user} currentRoom={currentRoom} />
                    </>
                ) : (
                    collapsed ? <Chat currentUser={user} currentRoom={currentRoom} /> : <SideBar currentUser={user} onRoomChange={handleRoomChange} collapsed={collapsed} />
                )}
            </div>
        </div>
    );
};

export default Home;
