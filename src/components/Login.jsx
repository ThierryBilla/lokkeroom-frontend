//login.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  // Assurez-vous d'utiliser la fonction 'login'
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Both email and password are required.");
            return;
        }
    
        try {
            const loggedIn = await login({ email, password });  // Utilisez 'login' directement
            if (loggedIn) {
                console.log('Navigation triggered after successful login');
                navigate('/');  // Redirection après une connexion réussie
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data.error : 'Login failed due to network error');
            alert(error.response ? error.response.data.error : 'Login failed due to network error');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    No account? <Link to="/register">Sign up</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
