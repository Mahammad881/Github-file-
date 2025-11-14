// backend/routes/studentRoutes.js

const express = require('express');
const { enrollStudent, getStudentDescriptors } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router(); // 1. Router initialized correctly

// POST /api/students/enroll
router.post('/enroll', protect, enrollStudent);

// GET /api/students/descriptors
router.get('/descriptors', getStudentDescriptors); 

// 2. ONLY the router object is exported
module.exports = router; // <--- THIS LINE MUST BE EXACTLY RIGHT