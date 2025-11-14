// frontend/src/components/Dashboard.js (UPDATED CODE)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Import the new CSS file
import '../styles/Dashboard.css'; 

function Dashboard() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <div style={{ padding: '20px' }}>
      <p>Please <Link to="/login">log in</Link> to access the dashboard.</p>
    </div>;
  }

  return (
    // Use the class name for styling
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      
      {/* Use the class name for styling the link group */}
      <div className="dashboard-links">
        <Link to="/attendance-table" className="dashboard-link dashboard-link-view">
          View Attendance Records
        </Link>
        <Link to="/add_student" className="dashboard-link dashboard-link-enroll">
          Enroll New Student (Face Registration)
        </Link>
        <button onClick={handleLogout} className="dashboard-button dashboard-button-logout">
            Logout
        </button>
      </div>
      
      {/* Use the class name for styling the note */}
      <p className="dashboard-note">
        The main attendance check Kiosk runs on the home page: <Link to="/">/ (Home)</Link>
      </p>
    </div>
  );
}

export default Dashboard;