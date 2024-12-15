import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landing.css'; // Custom CSS file for additional styles

const Landing = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

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
        fetch('http://localhost:4000/admin/services')
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((error) => console.error('Error fetching services:', error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const bookService = () => {
        if (!selectedService || !bookingDate) {
            alert('Please select a service and a date to book.');
            return;
        }

        fetch('http://localhost:4000/user/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: userEmail,
                service: selectedService.name,
                date: new Date().toISOString().split('T')[0],
                booking_date: bookingDate,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                alert('Service booked successfully!');
                setSelectedService(null);
                setBookingDate('');
            })
            .catch((error) => console.error('Error booking service:', error));
    };

    return (
        <div className="landing dark-mode">
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
                                    onClick={() => navigate('/my-bookings')}
                                >
                                    My Bookings
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="text-center text-light">
                    <h1>Welcome to PetCare</h1>
                    <p>Your trusted partner for pet services</p>
                    <p className="text-light text-center">Logged in as: {userEmail}</p>

                </div>
                <h2 className="text-light mt-4">Available Services</h2>
                <div className="row">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <div key={service.id} className="col-md-4 my-3">
                                <div className="card h-100 shadow-sm bg-light text-light">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{service.name}</h5>
                                        <p className="card-text text-muted">{service.description}</p>
                                        <h6 className="text-success">
                                            Price: ${service.price.toFixed(2)}
                                        </h6>
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={() => setSelectedService(service)}
                                        >
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">No services available at the moment.</p>
                    )}
                </div>
                {selectedService && (
                    <div className="modal" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-dark">Book Service: {selectedService.name}</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setSelectedService(null)}
                                    ></button>
                                </div>
                                <div className="modal-body text-dark">
                                    <p>{selectedService.description}</p>
                                    <label htmlFor="booking-date" className="form-label text-dark">
                                        Select Booking Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="booking-date"
                                        className="form-control"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setSelectedService(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button className="btn btn-success" onClick={bookService}>
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landing;
