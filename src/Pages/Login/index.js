import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import './index.css';

export function Login() {
    const { isAuthenticate, Login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    async function handleLogin() {
        await Login({
            email,
            password
        });
        
        navigate('/todo');
    }
    return (
        <div className='login-container'>
            <h1>Login</h1>
            <div className='form'>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>

            <div className='not-with-account-container'>
                <p>Ainda não tem conta ?</p>
                <Link to="/register">Registrar</Link>
            </div>
        </div>
    )
}
