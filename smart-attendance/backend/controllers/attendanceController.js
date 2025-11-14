// backend/controllers/attendanceController.js
const db = require('../db');

// --- KIOSK FUNCTION: Mark a Student Present ---
const markPresent = async (req, res) => {
    const { studentId } = req.body;

    if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required to mark attendance' });
    }

    try {
        // Insert a new attendance record
        await db.execute(
            'INSERT INTO attendance (student_id) VALUES (?)',
            [studentId]
        );
        
        res.json({ message: `Attendance marked for student ${studentId}` });
    } catch (error) {
        console.error('Mark attendance error:', error);
        res.status(500).json({ message: 'Server error marking attendance' });
    }
};

// --- ADMIN FUNCTION: Get All Attendance Records ---
const getAttendanceRecords = async (req, res) => {
    try {
        // Join attendance with students to get the student's name
        const [rows] = await db.execute(`
            SELECT 
                a.student_id, 
                s.name AS student_name, 
                a.check_in_time 
            FROM attendance a
            JOIN students s ON a.student_id = s.student_id
            ORDER BY a.check_in_time DESC
        `);

        res.json({ records: rows });
    } catch (error) {
        console.error('Fetch attendance error:', error);
        res.status(500).json({ message: 'Server error fetching records' });
    }
};

module.exports = { markPresent, getAttendanceRecords };