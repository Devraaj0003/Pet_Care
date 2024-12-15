import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css'; // Custom CSS for dark theme styling
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/landing');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (

        <div className="login-containe container mt-5 text-light">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin} className="p-4 rounded bg-dark">
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control bg-secondary text-light border-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control bg-secondary text-light border-0"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3">
                Don't have an account?{' '}
                <Link to="/register" className="text-info">Register here</Link>
            </p>
        </div>

    );
};

export default Login;
