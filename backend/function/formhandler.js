const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { and } = require('sequelize');

const SECRET_KEY = 'secret123';

function login(req, res) {
    const { email, password } = req.body;
    const query = 'SELECT * FROM login WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: results[0].id, email: results[0].email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    });
};


function adminlogin(req, res) {
    const { email, password } = req.body;
    const query = 'SELECT * FROM login WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: results[0].id, email: results[0].email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    });
};



function register(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    const query = 'INSERT INTO login (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'User registered successfully' });
    });
};

module.exports = {
    login, register, adminlogin
};

