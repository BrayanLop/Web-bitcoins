import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ user, avatarUrl, onLogout, cartCount = 0 }) {
  return (
    <nav className="dashboard-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.4rem' }}>₿</span>
        <div>
          <span className="dashboard-navbar-kicker">CryptoRat</span>
          <h2 className="dashboard-navbar-title">Panel de Control</h2>
        </div>
      </div>
      <div className="dashboard-navbar-meta" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/carrito" style={{ position: 'relative', color: '#8ea4c8', textDecoration: 'none', fontSize: '1.2rem' }}>
          🛒
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#4f6ef7', color: '#fff', borderRadius: '50%', fontSize: '0.65rem', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {cartCount}
            </span>
          )}
        </Link>
        {user && (
          <span style={{ fontSize: '0.8rem', color: '#8ea4c8', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.email}
          </span>
        )}
        <Link to="/perfil" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #4f6ef7' }}
            />
          ) : (
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4f6ef7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#fff', fontWeight: 700, flexShrink: 0 }}>
              {user?.email?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}
          <span style={{ fontSize: '0.8rem', color: '#4f6ef7', fontWeight: 600 }}>Mi perfil</span>
        </Link>
        <button
          onClick={onLogout}
          style={{ fontSize: '0.8rem', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#8ea4c8', borderRadius: '8px', padding: '0.3rem 0.75rem', cursor: 'pointer' }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
