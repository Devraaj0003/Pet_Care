import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to login if no token
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
            setUserEmail(payload.email);
        } catch (err) {
            console.error('Invalid token:', err);
            localStorage.removeItem('token');
            navigate('/'); // Redirect to login if token is invalid
        }
    }, [navigate]);

    useEffect(() => {
        if (!userEmail) return;

        // Fetch bookings for the current user
        fetch(`http://localhost:4000/mybookings?user=${userEmail}`)
            .then((response) => response.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error('Error fetching bookings:', error));
    }, [userEmail]);

    const deleteBooking = (id) => {
        fetch(`http://localhost:4000/bookings/${id}`, { method: 'DELETE' })
            .then(() => {
                setBookings(bookings.filter((booking) => booking.id !== id));
            })
            .catch((error) => console.error('Error deleting booking:', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-primary">My Bookings</h1>
            <button
                className="btn btn-outline-primary me-3"
                onClick={() => navigate('/landing')}
            >
                Dashboard
            </button>
            {bookings.length > 0 ? (
                <table className="table table-bordered mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Booking Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.service}</td>
                                <td>{booking.date}</td>
                                <td>{booking.booking_date}</td>
                                <td>{booking.status}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteBooking(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">No bookings found.</p>
            )}
        </div>
    );
};

export default MyBookings;
