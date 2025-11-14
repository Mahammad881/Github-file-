import { useState, useEffect } from "react";
import axios from "axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    PATIENT_NAME: "",
    DOCTOR_NAME: "",
    DEPARTMENT: "",
    DATE: "",
    REMARKS: ""
  });

  // Fetch all appointments
  useEffect(() => {
    axios.get("http://localhost:5000/appointments")
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new appointment
  const handleSubmit = () => {
  axios.post("http://localhost:5000/appointments", form)
    .then(() => {
      alert("Appointment Saved ✅");
      setForm({ PATIENT_NAME: "", DOCTOR_NAME: "", DEPARTMENT: "", DATE: "", REMARKS: "" });
      // Fetch all appointments again
      axios.get("http://localhost:5000/appointments")
        .then(res => setAppointments(res.data))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

  return (
    <div>
      <h2>Appointments</h2>
      <input name="PATIENT_NAME" placeholder="Patient Name" value={form.PATIENT_NAME} onChange={handleChange} />
      <input name="DOCTOR_NAME" placeholder="Doctor Name" value={form.DOCTOR_NAME} onChange={handleChange} />
      <input name="DEPARTMENT" placeholder="Department" value={form.DEPARTMENT} onChange={handleChange} />
      <input type="date" name="DATE" value={form.DATE} onChange={handleChange} />
      <input name="REMARKS" placeholder="Remarks" value={form.REMARKS} onChange={handleChange} />
      <button onClick={handleSubmit}>Save Appointment</button>

      <h3>All Appointments</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Patient</th><th>Doctor</th><th>Department</th><th>Date</th><th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.APPOINTMENT_ID}>
              <td>{a.APPOINTMENT_ID}</td>
              <td>{a.PATIENT_NAME}</td>
              <td>{a.DOCTOR_NAME}</td>
              <td>{a.DEPARTMENT}</td>
              <td>{a.DATE}</td>
              <td>{a.REMARKS}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}