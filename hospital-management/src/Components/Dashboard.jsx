export default function Dashboard() {
  return (
    <div className="card shadow-sm p-4">
      <h2 className="text-primary mb-4">Dashboard</h2>
      <div className="row text-center">
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>👩‍⚕️ Doctors</h5>
            <p className="display-6 text-success">12</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>🧑‍🤝‍🧑 Patients</h5>
            <p className="display-6 text-info">34</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>📅 Appointments</h5>
            <p className="display-6 text-warning">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
