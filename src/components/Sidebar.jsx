import React from 'react';

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-header">
        <span className="app-sidebar-label">Navegacion</span>
        <strong className="app-sidebar-title">Panel</strong>
      </div>
      <nav className="app-sidebar-nav">
        <ul className="app-sidebar-menu">
          <li><a href="#inicio"><span className="app-sidebar-icon">01</span><span>Inicio</span></a></li>
          <li><a href="#precio"><span className="app-sidebar-icon">02</span><span>Precio</span></a></li>
          <li><a href="#historial"><span className="app-sidebar-icon">03</span><span>Historial</span></a></li>
          <li><a href="#comentarios"><span className="app-sidebar-icon">04</span><span>Comunidad</span></a></li>
        </ul>
      </nav>
    </aside>
  );
}
