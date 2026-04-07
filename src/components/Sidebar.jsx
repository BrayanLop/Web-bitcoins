import React from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-header">
        <span className="app-sidebar-label">Navegacion</span>
        <strong className="app-sidebar-title">Panel</strong>
      </div>
      <nav className="app-sidebar-nav">
        <ul className="app-sidebar-menu">
          <li><Link to="/"><span className="app-sidebar-icon">01</span><span>Inicio</span></Link></li>
          <li><Link to="/precio"><span className="app-sidebar-icon">02</span><span>Precio</span></Link></li>
          <li><Link to="/historial"><span className="app-sidebar-icon">03</span><span>Historial</span></Link></li>
          <li><Link to="/comentarios"><span className="app-sidebar-icon">04</span><span>Comunidad</span></Link></li>
          <li><Link to="/productos"><span className="app-sidebar-icon">05</span><span>Productos</span></Link></li>
        </ul>
      </nav>
    </aside>
  );
}
