// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         const res = await axios.post('http://localhost:4000/login', { username, password });
//     //         localStorage.setItem('token', res.data.token);
//     //         alert('Login successful!');
//     //     } catch (err) {
//     //         console.error(err);
//     //         alert('Login failed!');
//     //     }
//     // };


//     function handleSubmit(e) {
//         e.preventDefault();
//         axios.post('http://localhost:4000/login', { username, password })
//             .then((result) => console.log(result))
//             .catch((err) => console.log(err))

//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit">Login</button>
//         </form>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/Dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="login-containe container mt-5 text-light">
            <h2 className="text-center">Login Admin</h2>
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
        </div>
    );
};

export default Login;

