import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { enrollStudent } from '../utils/api'; 
import { useNavigate } from 'react-router-dom';

const MODEL_PATH = '/models';

function AddStudent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [descriptor, setDescriptor] = useState(null);
  const [message, setMessage] = useState('');
  const [loadingModels, setLoadingModels] = useState(true);

  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // --- Load Models and Start Camera ---
  useEffect(() => {
    let currentStream;

    async function setupCameraAndModels() {
      try {
        setMessage('⏳ Loading AI models for enrollment...');
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_PATH),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_PATH),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_PATH),
        ]);
        setLoadingModels(false);
        setMessage('✅ Models loaded. Starting camera...');

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        currentStream = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Setup failed:", error);
        setMessage('❌ Could not load models or access camera.');
      }
    }

    setupCameraAndModels();

    return () => {
      if (currentStream) currentStream.getTracks().forEach(track => track.stop());
    };
  }, [navigate]);

  // --- Face Capture Logic ---
  const captureAndExtract = async () => {
    if (loadingModels) {
      setMessage('Models are still loading...');
      return;
    }
    if (!studentId || !name) {
      setMessage('Please enter Student ID and Name first.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || video.paused || video.ended) {
      setMessage('Camera stream is not active.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    setMessage('Analyzing captured image...');

    const result = await faceapi.detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }))
      .withFaceLandmarks(faceapi.nets.faceLandmark68TinyNet)
      .withFaceDescriptor();

    if (result) {
      const descriptorArray = Array.from(result.descriptor);
      setDescriptor(JSON.stringify(descriptorArray));
      setMessage('✅ Face descriptor extracted successfully! Ready to enroll.');
    } else {
      setMessage('❌ No face detected. Ensure good lighting.');
      setDescriptor(null);
    }
  };

  // --- Enrollment Submission Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descriptor) {
      setMessage('Please capture a face first.');
      return;
    }

    setMessage('Sending data to backend for enrollment...');

    try {
      const data = await enrollStudent({ 
        student_id: studentId, 
        name, 
        face_descriptor: descriptor 
      }, token);

      setMessage(`✅ Student Enrolled: ${data.message} (${name})`);
      setStudentId('');
      setName('');
      setDescriptor(null);

      // 🔔 Dispatch event so FaceRecognition can refresh immediately
      window.dispatchEvent(new Event('student-enrolled'));

    } catch (err) {
      setMessage(`❌ Enrollment failed: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2>Enroll New Student</h2>
      <p style={{ color: message.startsWith('❌') ? 'red' : message.startsWith('✅') ? 'green' : 'blue' }}>
        Status: {message}
      </p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />

        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>1. Position your face in the camera frame</p>
        <div style={{ textAlign: 'center' }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '400px', border: '2px solid #007bff', borderRadius: '4px' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        <button type="button" onClick={captureAndExtract} disabled={loadingModels || !studentId || !name}>
          Capture Face & Extract Descriptor
        </button>

        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>2. Enroll Student</p>
        <button type="submit" disabled={!descriptor}>
          Enroll Student (Save to Database)
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
