// frontend/src/components/FaceRecognition.js
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { getStudentDescriptors, markPresent } from '../utils/api';

const MODEL_PATH = '/models';
const FACE_DETECTION_INTERVAL_MS = 500;
const MIN_DISTANCE_THRESHOLD = 0.55;
const COOLDOWN_MINUTES = 60; // 1 hour cooldown

function FaceRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState('⏳ Loading models...');
  const [faceMatcher, setFaceMatcher] = useState(null);

  const studentsRef = useRef([]);

  // Load models and start camera
  useEffect(() => {
    let currentStream;

    async function setup() {
      try {
        setMessage('⏳ Loading AI models...');
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_PATH),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_PATH),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_PATH),
        ]);

        setMessage('✅ Models loaded. Starting camera...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        currentStream = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        await loadStudents();
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to load models or camera.');
      }
    }

    setup();

    return () => {
      if (currentStream) currentStream.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Load student descriptors
  const loadStudents = async () => {
    try {
      const data = await getStudentDescriptors();
      if (!data || !data.length) {
        setMessage('⚠ No students enrolled yet.');
        return;
      }

      studentsRef.current = data.map(s => ({ ...s, lastMarked: null }));

      const labeledDescriptors = data.map(student => {
        const descriptors = Array.isArray(student.face_descriptor)
          ? [new Float32Array(student.face_descriptor)]
          : [new Float32Array(JSON.parse(student.face_descriptor))];

        return new faceapi.LabeledFaceDescriptors(student.name, descriptors);
      });

      setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptors, MIN_DISTANCE_THRESHOLD));
      setMessage(`✅ Loaded ${labeledDescriptors.length} student(s). Ready for recognition.`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to fetch student data.');
    }
  };

  // Detection loop
  useEffect(() => {
    if (!videoRef.current || !faceMatcher) return;

    const interval = setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;

      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }))
        .withFaceLandmarks(true)
        .withFaceDescriptors();

      detections.forEach(detection => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        if (bestMatch.label !== 'unknown') {
          const student = studentsRef.current.find(s => s.name === bestMatch.label);
          if (!student) return;

          const now = new Date();
          if (!student.lastMarked || (now - student.lastMarked) / 60000 > COOLDOWN_MINUTES) {
            markPresent(student.student_id)
              .then(() => {
                student.lastMarked = now;
                setMessage(`✅ ${student.name}, attendance marked!`);
              })
              .catch(err => {
                console.error('Mark attendance error:', err);
                setMessage(`❌ Failed to mark attendance for ${student.name}`);
              });
          } else {
            setMessage(`⏳ ${student.name}, already present. Come after 1 hour`);
          }

          // Draw bounding box and name
          const { x, y, width, height } = detection.detection.box;
          ctx.strokeStyle = '#00FF00';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          ctx.fillStyle = '#00FF00';
          ctx.font = '18px Arial';
          ctx.fillText(student.name, x, y > 20 ? y - 8 : y + 20);
        }
      });
    }, FACE_DETECTION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [faceMatcher]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Smart Attendance Kiosk</h2>
      <p style={{ color: '#007bff', fontWeight: 'bold' }}>{message}</p>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: '640px', height: '480px' }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    </div>
  );
}

export default FaceRecognition;
