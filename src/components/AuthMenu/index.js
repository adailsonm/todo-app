import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import './index.css'

function AuthMenu() {
    const { name, Logout } = useAuth();
    let navigate = useNavigate();

    function handleLogout() {
        Logout();
        navigate('/login')
    }
    return (
        <nav className="menu">
            <ul>
                <li>
                    <span className='userName'>{name}</span><span className='arrow'></span>
                    <ul>
                        <li><Link to="/login" onClick={() => handleLogout()}>Logout</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default AuthMenu