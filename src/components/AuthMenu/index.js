import React from 'react'
import { useAuth } from '../../contexts/auth';
import './index.css'
// eslint-disable-next-line react-hooks/rules-of-hooks

function AuthMenu() {
    const { name } = useAuth();
    
    return (
        <nav className="menu">
            <ul>
                <li>
                    <span className='userName'>{name}</span><span className='arrow'></span>
                    <ul>
                        <li><a href="/teste">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default AuthMenu