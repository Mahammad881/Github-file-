import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import FaceRecognition from './components/FaceRecognition';
import FaceRecognitionTest from './components/FaceRecognitionTest';
import AttendanceTable from './components/AttendanceTable';
import { ProtectedRoute } from './components/ProtectedRoute';

function FaceRecognitionWrapper() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  return mode === 'debug' ? <FaceRecognitionTest /> : <FaceRecognition />;
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', textAlign: 'center' }}>
        <a href="/">Kiosk</a> |{" "}
        <a href="/?mode=debug">Kiosk Debug</a> |{" "}
        <a href="/dashboard">Dashboard</a> |{" "}
        <a href="/add_student">Add Student</a> |{" "}
        <a href="/attendance-table">Attendance Table</a>
      </nav>

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <FaceRecognitionWrapper />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add_student" 
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/attendance-table" 
          element={
            <ProtectedRoute>
              <AttendanceTable />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
