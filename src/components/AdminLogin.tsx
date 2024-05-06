import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (
            (email === 'admin123@wtf.com' && password === 'password123')
        ) {
            navigate("/admin")

        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminLogin;
