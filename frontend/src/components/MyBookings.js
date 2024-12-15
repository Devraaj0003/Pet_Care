import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './MyBookings.css'; // Custom CSS file for additional styles

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUserEmail(payload.email);
        } catch (err) {
            console.error('Invalid token:', err);
            localStorage.removeItem('token');
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        if (!userEmail) return;

        fetch(`http://localhost:4000/user/mybookings?user=${userEmail}`)
            .then((response) => response.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error('Error fetching bookings:', error));
    }, [userEmail]);

    const deleteBooking = (id) => {
        fetch(`http://localhost:4000/user/bookings/${id}`, { method: 'DELETE' })
            .then(() => {
                setBookings(bookings.filter((booking) => booking.id !== id));
            })
            .catch((error) => console.error('Error deleting booking:', error));
    };

    return (
        <div className="my-bookings dark-mode">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
                <div className="container">
                    <a className="navbar-brand" href="#">PetCare</a>
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
                                    className="btn btn-outline-light me-3"
                                    onClick={() => navigate('/landing')}
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        navigate('/');
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                <h1 className="text-center text-light">My Bookings</h1>
                {bookings.length > 0 ? (
                    <table className="table table-bordered table-dark mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Booking Date</th>
                                <th>Status</th>

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

                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-muted">No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
