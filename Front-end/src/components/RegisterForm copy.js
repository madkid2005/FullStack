import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        fetch('http://localhost:8000/api/accounts/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                setMessage('Registration successful!');
                navigate('/login'); 
            } else {
                setMessage('Registration failed. Please try again.');
            }
        })
       
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="is_seller">Register as Seller:</label>
                    <input
                        type="checkbox"
                        id="is_seller"
                        checked={isSeller}
                        onChange={(e) => setIsSeller(e.target.checked)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {message && <div id="registerMessage">{message}</div>}
        </div>
    );
}

export default RegisterForm;
