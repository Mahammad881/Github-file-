// src/Components/Patients.jsx
import { useState } from "react";
import { useStore } from "./Store";

export default function Patients() {
  const { patients } = useStore();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Select</th>
          <th>Patient</th>
          <th>Doctor</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td>
              <input
                type="radio"
                name="appointmentSelect"
                value={p.id}
                checked={selectedId === p.id}
                onChange={(e) => setSelectedId(Number(e.target.value))}
              />
            </td>
            <td>{p.name}</td>
            <td>{p.doctor}</td>
            <td>{p.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
