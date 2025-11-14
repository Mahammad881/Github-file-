import { useState } from "react";
export default function Doctors() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Williams", specialty: "Cardiology" },
    { id: 2, name: "Dr. Brown", specialty: "Pediatrics" },
  ]);

  const [form, setForm] = useState({ name: "", specialty: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDoctors([
      ...doctors,
      { id: Date.now(), name: form.name, specialty: form.specialty },
    ]);
    setForm({ name: "", specialty: "" });
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="text-primary mb-3">Doctors</h2>

      <form className="row g-2 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Doctor Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Specialty"
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            ➕ Add
          </button>
        </div>
      </form>

      <ul className="list-group">
        {doctors.map((d) => (
          <li key={d.id} className="list-group-item">
            <strong>{d.name}</strong> – {d.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
}
