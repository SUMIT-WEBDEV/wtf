import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (email === 'admin123@wtf.com' && password === 'password123') {
            navigate('/admin');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className='bg-white p-10 m-10 shadow-lg rounded-lg'>

                <h2 className="mb-4 text-2xl font-bold">Admin Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-semibold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1 font-semibold">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>

        </div>
    );
};

export default AdminLogin;
