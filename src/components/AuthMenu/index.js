import React from 'react';
import { useAuth } from '../../contexts/auth';

import './index.css'

function AuthMenu() {
    const { name, Logout } = useAuth();
    function handleLogout() {
        //Logout();
        console.log("entrou")
    }
    return (
        <nav className="menu">
            <ul>
                <li>
                    <span className='userName'>{name}</span><span className='arrow'></span>
                    <ul>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default AuthMenu