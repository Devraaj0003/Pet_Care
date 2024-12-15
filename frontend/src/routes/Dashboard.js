import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingsTable from '../components/BookingsTable';
import ServiceTable from '../components/ServiceTable';
// import './Dashboard.css'; // Custom CSS file for styling

const Dashboard = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/admin/login'); // Redirect if no token

        try {
            const email = JSON.parse(atob(token.split('.')[1])).email;
            setUserEmail(email);
        } catch {
            localStorage.removeItem('token');
            navigate('/admin/login'); // Redirect if token is invalid
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard dark-mode">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
                <div className="container">
                    <a className="navbar-brand" href="#">PetCare Admin</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <h2 className="text-light text-center">Welcome to the Admin Dashboard</h2>
                <p className="text-light text-center">Logged in as: {userEmail}</p>

                <div className="mt-4">
                    <ServiceTable />
                </div>

                <div className="mt-5">
                    <BookingsTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
