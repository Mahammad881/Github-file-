import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Patients from "./Components/Patients";
import Doctors from "./Components/Docters";
import Appointments from "./Components/Appointments";
import { StoreProvider } from "./Components/Store.jsx";

export default function App() {
  return (
    <StoreProvider>
      <div className="bg-light min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="container py-4 flex-grow-1 d-flex align-items-start justify-content-center">
          <div className="w-100" style={{ maxWidth: 1000 }}>
            <div className="text-center mb-4">
              <h1 className="text-primary fw-bold">🏥 Lifesaver Hospital</h1>
              <p className="text-secondary m-0">Hospital Management System</p>
            </div>

            <ul className="nav nav-pills justify-content-center gap-2 mb-4">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/patients" className="nav-link">
                  Patients
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/doctors" className="nav-link">
                  Doctors
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/appointments" className="nav-link">
                  Appointments
                </NavLink>
              </li>
            </ul>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/appointments" element={<Appointments />} />
            </Routes>
          </div>
        </main>
        <footer className="text-center py-3 small text-muted">
          © {new Date().getFullYear()} Lifesaver Hospital
        </footer>
      </div>
    </StoreProvider>
  );
}
