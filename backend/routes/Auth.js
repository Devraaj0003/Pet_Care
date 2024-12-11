const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

const secret = 'supersecretkey';

router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

    db.query(sql, [username, hashedPassword, role], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User registered successfully!' });
    });
});

// router.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM users WHERE username = ?';

//     db.query(sql, [username], (err, results) => {
//         if (err) return res.status(500).json(err);
//         if (results.length === 0) return res.status(404).json({ message: 'User not found' });

//         const user = results[0];
//         const validPassword = bcrypt.compareSync(password, user.password);
//         if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

//         const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
//         res.json({ token });
//     });
// });


router.post('/login', (req, res) => {
    console.log('Login route hit');
    const { username, password } = req.body;
    console.log(req.body.username);
    console.log(req.body.password);

    const sql = `SELECT * FROM login WHERE email = ? AND pass = ?`;
    db.query(sql, [req.body.username, req.body.password], (err, results) => {
        if (err) return res.json("Error");
        if (results.length > 0) {
            return res.json("Login Successfully");
        } else {
            return res.json("No records");
        }
    });
});

module.exports = router;
