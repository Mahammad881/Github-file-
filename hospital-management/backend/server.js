const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Hanif18",   // Your MySQL password
  database: "hospital_db"
});

db.connect(err => {
  if (err) console.error("❌ DB connection error:", err);
  else console.log("✅ MySQL connected");
});

// Create table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS appointment1 (
  APPOINTMENT_ID INT AUTO_INCREMENT PRIMARY KEY,
  PATIENT_NAME VARCHAR(255),
  DOCTOR_NAME VARCHAR(255),
  DEPARTMENT VARCHAR(255),
  DATE DATE,
  REMARKS TEXT
)`;
db.query(createTableQuery);

// Insert new appointment
app.post("/appointments", (req, res) => {
  const { PATIENT_NAME, DOCTOR_NAME, DEPARTMENT, DATE, REMARKS } = req.body;
  const sql = "INSERT INTO appointment1 (PATIENT_NAME, DOCTOR_NAME, DEPARTMENT, DATE, REMARKS) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [PATIENT_NAME, DOCTOR_NAME, DEPARTMENT, DATE, REMARKS], (err, result) => {
    if (err) return res.status(500).json(err);
    // Return the inserted row
    db.query("SELECT * FROM appointment1 WHERE APPOINTMENT_ID = ?", [result.insertId], (err2, rows) => {
      if (err2) return res.status(500).json(err2);
      res.json(rows[0]);
    });
  });
});

// Fetch all appointments
app.get("/appointments", (req, res) => {
  db.query("SELECT * FROM appointment1", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Start server on port 5000
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});