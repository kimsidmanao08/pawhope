function Admin() {
  return (
    <div className="page">

      <h1>Admin Dashboard 🔐</h1>

      <div className="admin-cards">

        <div className="admin-card">
          <h2>0</h2>
          <p>Total Donations</p>
        </div>

        <div className="admin-card">
          <h2>0</h2>
          <p>Animal Reports</p>
        </div>

        <div className="admin-card">
          <h2>₱0</h2>
          <p>Total Funds</p>
        </div>

      </div>

      <h2>Donation Records</h2>

      <p>
        Donation records will appear here after the database
        is connected.
      </p>

    </div>
  );
}

export default Admin;