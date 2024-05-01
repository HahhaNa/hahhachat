import React from 'react'

const NavBar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>Hahha Chat</span>
            <div className='userinfo'>
                <img src="https://icons.veryicon.com/png/o/transport/car-function-button/user-136.png" alt="pic" />
                <p>Hanna</p>
            </div>
            <button>LogOut</button>
        </div>
    )
}

export default NavBar