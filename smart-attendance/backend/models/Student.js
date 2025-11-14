// backend/models/Student.js
const db = require('../db');

const studentModel = {
    // Saves a new student or updates existing student's data and face descriptor
    enroll: async (student_id, name, face_descriptor) => {
        const query = `
            INSERT INTO students (student_id, name, face_descriptor) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE name = ?, face_descriptor = ?
        `;
        await db.execute(query, [student_id, name, face_descriptor, name, face_descriptor]);
    },
    
    // Retrieves all student IDs and their descriptors for the face matcher
    findAllDescriptors: async () => {
        const [rows] = await db.execute('SELECT student_id, face_descriptor FROM students');
        return rows;
    }
};

module.exports = studentModel;