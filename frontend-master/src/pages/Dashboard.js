import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingsTable from '../components/BookingsTable';
import ServiceTable from '../components/ServiceTable';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');


    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({ user: '', service: '', date: '' });

    // Token authentication
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/'); // Redirect if no token

        try {
            const email = JSON.parse(atob(token.split('.')[1])).email;
            setUserEmail(email);
        } catch {
            localStorage.removeItem('token');
            navigate('/'); // Redirect if token is invalid
        }
    }, [navigate]);






    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="container mt-5">
            <h2>Welcome to the Dashboard Page</h2>
            <p>Email: {userEmail}</p>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>

            <ServiceTable />
            <BookingsTable />


        </div>
    );
};

export default Dashboard;
