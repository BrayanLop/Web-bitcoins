import { useState } from 'react';
import { Layout } from './Layout';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Card } from './Card';
import { TaskList } from './TaskList';
import { StatsCards } from './StatsCards';
import { Semaforo } from './Semaforo';
import ShoppingCart from './ShoppingCart';
import { ToDo } from './ToDo';
import '../App.css';
import { Outlet } from 'react-router-dom';

function LayoutBase() {
  const [moneda, setMoneda] = useState("");
  const [texto, setTexto] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const stats = [
    { label: 'Precio Actual', value: '$67,500' },
    { label: 'Volumen 24h', value: '1.2B USD' },
    { label: 'ATH', value: '$69,000' },
    { label: 'Min 24h', value: '$66,000' },
    { label: 'Max 24h', value: '$68,200' },
  ];

  function publicar(e) {
    e.preventDefault();
    if (texto.trim() === "") return;
    setPublicaciones([...publicaciones, texto]);
    setTexto("");
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet context={{
            moneda, setMoneda,
            texto, setTexto,
            publicaciones, setPublicaciones,
            stats
          }} />
        </main>
      </div>
    </>
  );
}

export { LayoutBase };
