// backend/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// --- Core Imports ---
const db = require('./db'); 
const userModel = require('./models/User'); // Import the User model

// --- Route Imports ---
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// 🛑 CRITICAL MODIFICATION: Allow both localhost and 127.0.0.1 origins
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] })); 
app.use(express.json()); 

// --- Initial Setup (Run Once to ensure admin user exists) ---
const setupInitialUser = async () => {
    const password = 'password123'; // Default admin password
    const username = 'admin';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        // Use the model to handle insertion/update
        await userModel.setupAdmin(username, hashedPassword); 
        console.log('Default admin user set up: "admin" / "password123" (Hashed)');
    } catch (error) {
        console.error('Error during initial user setup:', error);
    }
};

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);


// Start Server
// Ensure connection is OK before listening
db.getConnection() 
    .then(() => {
        console.log('Successfully connected to MySQL Database.');
        return setupInitialUser(); // Setup admin user
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('FATAL ERROR: Failed to connect to database or start server.', err);
        process.exit(1);
    });