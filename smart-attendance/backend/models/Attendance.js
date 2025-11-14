// backend/models/Attendance.js
const db = require('../db');

const attendanceModel = {
    // Kiosk function: Inserts a new attendance record
    markPresent: async (studentId) => {
        const query = 'INSERT INTO attendance (student_id) VALUES (?)';
        await db.execute(query, [studentId]);
    },

    // Admin function: Retrieves all attendance records with student names
    findAllRecords: async () => {
        const query = `
            SELECT 
                a.student_id, 
                s.name AS student_name, 
                a.check_in_time 
            FROM attendance a
            JOIN students s ON a.student_id = s.student_id
            ORDER BY a.check_in_time DESC
        `;
        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = attendanceModel;