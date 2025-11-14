// frontend/src/components/AttendanceTable.js
import React, { useState, useEffect } from 'react';
import { getAttendanceRecords } from '../utils/api';

function AttendanceTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
        setError('Not authorized. Please log in.');
        setLoading(false);
        return;
    }
    
    getAttendanceRecords(token)
      .then(data => {
        // Assuming data.records contains { student_id, student_name, check_in_time }
        setRecords(data.records);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setError(`Error fetching records: ${err.message}`);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading attendance records...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Today's Attendance Records</h2>
      
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Check-In Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <tr key={index}>
                <td>{record.student_id}</td>
                <td>{record.student_name || 'N/A'}</td> 
                <td>{new Date(record.check_in_time).toLocaleTimeString()}</td>
                <td>{new Date(record.check_in_time).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No attendance records found for today.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;