// backend/controllers/authController.js
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                message: 'Login successful',
                token: generateToken(user.id),
                username: user.username,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = { loginUser };