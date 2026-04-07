
import React from 'react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-header">
        <span className="app-sidebar-label">Navegacion</span>
        <strong className="app-sidebar-title">Panel</strong>
      </div>
      <nav className="app-sidebar-nav">
        <ul className="app-sidebar-menu">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}><span className="app-sidebar-icon">01</span><span>Inicio</span></NavLink></li>
          <li><NavLink to="/precio" className={({ isActive }) => isActive ? 'active' : ''}><span className="app-sidebar-icon">02</span><span>Precio</span></NavLink></li>
          <li><NavLink to="/historial" className={({ isActive }) => isActive ? 'active' : ''}><span className="app-sidebar-icon">03</span><span>Historial</span></NavLink></li>
          <li><NavLink to="/comentarios" className={({ isActive }) => isActive ? 'active' : ''}><span className="app-sidebar-icon">04</span><span>Comunidad</span></NavLink></li>
          <li><NavLink to="/productos" className={({ isActive }) => isActive ? 'active' : ''}><span className="app-sidebar-icon">05</span><span>Productos</span></NavLink></li>
          <li><NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}><span className="app-sidebar-icon">06</span><span>Carrito</span></NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}
