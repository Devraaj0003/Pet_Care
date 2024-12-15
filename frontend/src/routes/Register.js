import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/auth/register', { email, password });
            alert('Registration successful');
        } catch (err) {
            alert('Registration failed');
            console.log(err);
        }
    };

    return (
        <div className="login-container container mt-5 text-light">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleRegister} className="p-4 rounded bg-dark">
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
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <p>
                Already have an account?{' '}
                <Link to="/" className="text-info">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
