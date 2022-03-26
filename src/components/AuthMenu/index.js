import React from 'react'
import './index.css'

function AuthMenu() {
    return (
        <nav className="menu">
            <ul>
                <li>
                    <a href="/test">Adailson<span className='arrow'></span></a>
                    <ul>
                        <li><a href="/teste">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default AuthMenu