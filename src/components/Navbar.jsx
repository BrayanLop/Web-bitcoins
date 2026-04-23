import React from 'react';

export function Navbar() {
  return (
    <nav className="dashboard-navbar">
      <div>
        <span className="dashboard-navbar-kicker">CryptoRat</span>
        <h2 className="dashboard-navbar-title">Bitcoin</h2>
      </div>
      <div className="dashboard-navbar-meta">
        {/* <span className="dashboard-navbar-badge">Mercado abierto</span> */}
      </div>
    </nav>
  );
}
