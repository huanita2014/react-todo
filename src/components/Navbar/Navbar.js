import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, user, logout }) {
    const handleClick = (e) => {
        e.preventDefault();
        logout();
    };
    const loginLayout = (
        <div className="navbar">
            <button onClick={handleClick}>logout</button>
            <span>{user}</span>
        </div>
    );

    const notLoginLayout = (
        <div className="navbar">
            <Link to="/login"> Login</Link>
            <Link to="/register"> Register</Link>
        </div>
    );

    return (
        isAuthenticated ? loginLayout : notLoginLayout
    );
}