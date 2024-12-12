const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');


const app = express();
const port = 4000;


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


const formHandler = require('./function/formhandler');

// Routes
app.post('/login', formHandler.login);
app.post('/register', formHandler.register);
app.post('/admin/login', formHandler.adminlogin);
app.get('/services', (req, res) => {
    const query = 'SELECT * FROM services';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});
app.post('/services', (req, res) => {
    const { name, description, price } = req.body;
    const query = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
    db.query(query, [name, description, price], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, name, description, price });
    });
});

// Edit an existing service
app.put('/services/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const query = 'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?';
    db.query(query, [name, description, price, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Service updated successfully' });
    });
});

// Delete a service
app.delete('/services/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM services WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Service deleted successfully' });
    });
});

// Get all bookings
app.get('/bookings', (req, res) => {
    const query = 'SELECT * FROM bookings';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Fetch bookings for a specific user
app.get('/mybookings', (req, res) => {
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
app.put('/bookings/:id/complete', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE bookings SET status = "Completed" WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Booking marked as completed' });
    });
});

// Delete a booking
app.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM bookings WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Booking deleted successfully' });
    });
});

app.post('/bookings', (req, res) => {
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


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));