// backend/models/User.js
const db = require('../db');

const userModel = {
    // Finds a user by username for login
    findByUsername: async (username) => {
        const [rows] = await db.execute('SELECT id, username, password FROM users WHERE username = ?', [username]);
        return rows[0];
    },
    
    // Creates or updates the initial admin user (used in server.js)
    setupAdmin: async (username, hashedPassword) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)';
        await db.execute(query, [username, hashedPassword]);
    }
};

module.exports = userModel;