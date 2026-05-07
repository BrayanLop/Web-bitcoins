
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: '🏠', label: 'Dashboard', end: true },
  { to: '/mercado', icon: '📈', label: 'Mercado' },
  { to: '/historial', icon: '📋', label: 'Historial' },
  { to: '/operaciones', icon: '⚡', label: 'Operar' },
  { to: '/comunidad', icon: '💬', label: 'Comunidad' },
  { to: '/tienda', icon: '🛍️', label: 'Tienda' },
  { to: '/carrito', icon: '🛒', label: 'Carrito' },
  { to: '/tareas', icon: '✅', label: 'Tareas' },
  { to: '/perfil', icon: '👤', label: 'Perfil' },
];

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-header">
        <span className="app-sidebar-label">Navegación</span>
        <strong className="app-sidebar-title">CryptoRat</strong>
      </div>
      <nav className="app-sidebar-nav">
        <ul className="app-sidebar-menu">
          {navItems.map(({ to, icon, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="app-sidebar-icon">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
