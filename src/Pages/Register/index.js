import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/auth';
import { api } from '../../service/api';

import './index.css';

export function Register() {
    const { isAuthenticate, Login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    async function handleRegister() {
        try {
            let response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            navigate('/login');

        } catch(error) {
            if(error.response) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
    return (
        <div className='register-container'>
            <h1>Register</h1>
            <div className='form'>
                <input 
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
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
                <button onClick={handleRegister}>Enviar</button>
            </div>
        </div>
    )
}
