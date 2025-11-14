// backend/controllers/studentController.js
import db from '../db.js';

// --- ADMIN FUNCTION: Enroll a New Student ---
export const enrollStudent = async (req, res) => {
  const { student_id, name, face_descriptor } = req.body;

  if (!student_id || !name || !face_descriptor) {
    return res.status(400).json({ message: 'Missing required student data' });
  }

  try {
    // ✅ Always store descriptor as JSON string
    const descriptor_json_string = JSON.stringify(face_descriptor);

    await db.execute(
      `INSERT INTO students (student_id, name, face_descriptor)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE name = ?, face_descriptor = ?`,
      [student_id, name, descriptor_json_string, name, descriptor_json_string]
    );

    res.status(201).json({
      message: `Student ${name} (${student_id}) enrolled/updated successfully.`,
    });
  } catch (error) {
    console.error('❌ Enrollment error:', error);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
};

// --- KIOSK FUNCTION: Retrieve All Descriptors for Matching ---
export const getStudentDescriptors = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT student_id, name, face_descriptor FROM students'
    );

    const cleanedDescriptors = rows
      .map(row => {
        let descriptor = row.face_descriptor;

        // ✅ Parse JSON from DB string
        if (typeof descriptor === 'string') {
          try {
            descriptor = JSON.parse(descriptor);
          } catch (e) {
            console.error(`❌ Failed to parse descriptor for ${row.name}: ${e.message}`);
            return null; // skip this entry entirely
          }
        }

        // ✅ Validate descriptor array shape
        if (!Array.isArray(descriptor) || descriptor.length !== 128) {
          console.warn(`⚠ Invalid descriptor length for ${row.name}. Skipping.`);
          return null;
        }

        return {
          student_id: row.student_id,
          name: row.name,
          face_descriptor: descriptor,
        };
      })
      .filter(Boolean); // remove null/invalid entries

    res.json({ descriptors: cleanedDescriptors });
  } catch (error) {
    console.error('❌ Fetch descriptor error:', error);
    res.status(500).json({ message: 'Server error retrieving descriptors' });
  }
};
