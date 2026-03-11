import React from 'react';

export function Navbar() {
  return (
    <nav className="dashboard-navbar">
      <div>
        <span className="dashboard-navbar-kicker">Crypto monitor</span>
        <h2 className="dashboard-navbar-title">Bitcoin Dashboard</h2>
      </div>
      <div className="dashboard-navbar-meta">
        <span className="dashboard-navbar-badge">Mercado abierto</span>
        <span className="dashboard-navbar-session">Actualizacion intradia</span>
      </div>
    </nav>
  );
}
