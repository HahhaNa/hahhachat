import React from 'react';
import firebase from 'firebase/app';
import { auth } from '../config'
import { Link, useNavigate } from "react-router-dom";

const NavBar = (currentUser) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            console.log("User signed out successfully");
            navigate("/register");
        }).catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
        });
    };

    return (
        <div className='navbar'>
            <span className='logo'>Hahha Chat</span>
            <div className='userinfo'>
                <img src="https://icons.veryicon.com/png/o/transport/car-function-button/user-136.png" alt="pic" />
                <p>{currentUser.displayName}</p>
            </div>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    );
};

export default NavBar;
