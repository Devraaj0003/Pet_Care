import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

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
        // Fetch services
        fetch('http://localhost:4000/services')
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

        fetch('http://localhost:4000/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: userEmail,
                service: selectedService.name,
                date: new Date().toISOString().split('T')[0], // Current date
                booking_date: bookingDate, // Selected booking date
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Service booked successfully!');
                setSelectedService(null);
                setBookingDate('');
            })
            .catch((error) => console.error('Error booking service:', error));
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">User Dashboard</h1>
                <p>Email: {userEmail}</p>
                <div>
                    <button
                        className="btn btn-outline-primary me-3"
                        onClick={() => navigate('/my-bookings')}
                    >
                        My Bookings
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="row">
                <h2 className="text-secondary">Available Services</h2>
                {services.length > 0 ? (
                    services.map((service) => (
                        <div key={service.id} className="col-md-4 my-3">
                            <div className="card h-100 shadow-sm">
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
                                <h5 className="modal-title">Book Service: {selectedService.name}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedService(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>{selectedService.description}</p>
                                <label htmlFor="booking-date" className="form-label">
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
    );
};

export default Landing;
