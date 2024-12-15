// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const BookingsTable = () => {
//     const [bookings, setBookings] = useState([]);

//     // Fetch bookings
//     useEffect(() => {
//         fetch('http://localhost:4000/user/bookings')
//             .then((response) => response.json())
//             .then((data) => setBookings(data))
//             .catch((error) => console.error('Error fetching bookings:', error));
//     }, []);

//     // Mark booking as completed
//     const completeBooking = (id) => {
//         fetch(`http://localhost:4000/user/bookings/${id}/complete`, { method: 'PUT' }).then(() => {
//             setBookings(
//                 bookings.map((booking) =>
//                     booking.id === id ? { ...booking, status: 'Completed' } : booking
//                 )
//             );
//         });
//     };

//     // Delete a booking
//     const deleteBooking = (id) => {
//         fetch(`http://localhost:4000/user/bookings/${id}`, { method: 'DELETE' }).then(() => {
//             setBookings(bookings.filter((booking) => booking.id !== id));
//         });
//     };

//     return (
//         <div className="container mt-5">
//             <h2>User Bookings</h2>
//             <table className="table table-bordered">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>ID</th>
//                         <th>User</th>
//                         <th>Service</th>
//                         <th>Date</th>
//                         <th>Booking Date</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map((booking) => (
//                         <tr key={booking.id}>
//                             <td>{booking.id}</td>
//                             <td>{booking.user}</td>
//                             <td>{booking.service}</td>
//                             <td>{booking.date}</td>
//                             <td>{booking.booking_date}</td>
//                             <td>{booking.status}</td>
//                             <td>
//                                 {booking.status !== 'Completed' && (
//                                     <button
//                                         className="btn btn-success me-2"
//                                         onClick={() => completeBooking(booking.id)}
//                                     >
//                                         Mark as Completed
//                                     </button>
//                                 )}
//                                 <button
//                                     className="btn btn-danger"
//                                     onClick={() => deleteBooking(booking.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default BookingsTable;



import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './BookingsTable.css'; // Custom CSS for styling

const BookingsTable = () => {
    const [bookings, setBookings] = useState([]);

    // Fetch bookings
    useEffect(() => {
        fetch('http://localhost:4000/user/bookings')
            .then((response) => response.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error('Error fetching bookings:', error));
    }, []);

    // Mark booking as completed
    const completeBooking = (id) => {
        fetch(`http://localhost:4000/user/bookings/${id}/complete`, { method: 'PUT' }).then(() => {
            setBookings(
                bookings.map((booking) =>
                    booking.id === id ? { ...booking, status: 'Completed' } : booking
                )
            );
        });
    };

    // Delete a booking
    const deleteBooking = (id) => {
        fetch(`http://localhost:4000/user/bookings/${id}`, { method: 'DELETE' }).then(() => {
            setBookings(bookings.filter((booking) => booking.id !== id));
        });
    };

    return (
        <div className="bookings-table container mt-5">
            <h2 className="text-light text-center mb-4">User Bookings</h2>
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
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
                            <td>{booking.user}</td>
                            <td>{booking.service}</td>
                            <td>{booking.date}</td>
                            <td>{booking.booking_date}</td>
                            <td>{booking.status}</td>
                            <td>
                                {booking.status !== 'Completed' && (
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => completeBooking(booking.id)}
                                    >
                                        Mark as Completed
                                    </button>
                                )}
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
        </div>
    );
};

export default BookingsTable;
