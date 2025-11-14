// backend/routes/attendanceRoutes.js

const express = require('express');
const { markPresent, getAttendanceRecords } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware'); // Assuming this is used for admin routes

// 1. Initialize the router
const router = express.Router(); 

// POST /api/attendance/present (KIOSK route: Mark attendance)
// This is usually unprotected so anyone with a detected face can check in
router.post('/present', markPresent);

// GET /api/attendance/records (ADMIN route: Get all records)
// This should be protected by the admin authentication middleware
router.get('/records', protect, getAttendanceRecords);

// 2. Export the router
module.exports = router;