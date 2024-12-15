const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/services', (req, res) => {
    const query = 'SELECT * FROM services';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});
router.post('/services', (req, res) => {
    const { name, description, price } = req.body;
    const query = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
    db.query(query, [name, description, price], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, name, description, price });
    });
});

// Edit an existing service
router.put('/services/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const query = 'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?';
    db.query(query, [name, description, price, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Service updated successfully' });
    });
});

// Delete a service
router.delete('/services/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM services WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Service deleted successfully' });
    });
});


module.exports = router;

