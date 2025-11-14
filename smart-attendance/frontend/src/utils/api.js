// frontend/src/utils/api.js

// ✅ Use loopback IP explicitly to avoid CORS and DNS issues
const API_BASE_URL = 'http://127.0.0.1:5000/api';

/**
 * Helper to handle fetch responses and throw structured errors.
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  const data = contentType && contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
  }
  return data;
};

// --- AUTHENTICATION ---
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

// --- STUDENT MANAGEMENT ---

// ✅ 1. Get Descriptors: Used by FaceRecognition for matching
export const getStudentDescriptors = async () => {
  const token = localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const response = await fetch(`${API_BASE_URL}/students/descriptors`, {
    headers,
  });

  const data = await handleResponse(response);

  // ✅ FIXED RETURN SHAPE: Ensure it always returns an array, matching FaceRecognition expectations
  return Array.isArray(data.descriptors) ? data.descriptors : data;
};

// ✅ 2. Enroll Student: Used by AddStudent to save new faces/data
export const enrollStudent = async (studentData, token) => {
  const response = await fetch(`${API_BASE_URL}/students/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(studentData),
  });
  return handleResponse(response);
};

// --- ATTENDANCE ---

// ✅ Mark Present: used by FaceRecognition after successful identification
export const markPresent = async (studentId) => {
  const token = localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/attendance/present`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ studentId }),
    });

    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await response.json()
      : null;

    if (!response.ok) {
      // Return backend error message if available
      throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
    }

    return data;
  } catch (err) {
    console.error('markPresent error:', err);
    throw err; // propagate error to FaceRecognition
  }
};

// ✅ 3. Get Attendance Records: Used by AttendanceTable
export const getAttendanceRecords = async (token) => {
  const response = await fetch(`${API_BASE_URL}/attendance/records`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
