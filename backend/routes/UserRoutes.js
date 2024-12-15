const express = require('express');
const router = express.Router();
const db = require('../config/db');

//Get all Booking
router.get('/bookings', (req, res) => {
    const query = 'SELECT * FROM bookings';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Fetch bookings for a specific user
router.get('/mybookings', (req, res) => {
    const user = req.query.user;
    if (!user) {
        return res.status(400).json({ error: 'User email is required' });
    }

    const sql = 'SELECT * FROM bookings WHERE user = ?';
    db.query(sql, [user], (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Mark booking as completed
router.put('/bookings/:id/complete', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE bookings SET status = "Completed" WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Booking marked as completed' });
    });
});

// Delete a booking
router.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM bookings WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Booking deleted successfully' });
    });
});

router.post('/bookings', (req, res) => {
    const { user, service, date, booking_date } = req.body;
    if (!user || !service || !date || !booking_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO bookings (user, service, date, booking_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [user, service, date, booking_date], (err, result) => {
        if (err) {
            console.error('Error creating booking:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({
            id: result.insertId,
            user,
            service,
            date,
            booking_date,
            status: 'Pending'
        });
    });
});



module.exports = router;

