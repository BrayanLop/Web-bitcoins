import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import '../App.css';
import { Outlet } from 'react-router-dom';
import type { CommunityPost, DashboardOutletContext, PriceStat } from '../types';

const initialStats: PriceStat[] = [
  { label: 'Precio Actual', value: '$67,500' },
  { label: 'Volumen 24h', value: '1.2B USD' },
  { label: 'ATH', value: '$69,000' },
  { label: 'Min 24h', value: '$66,000' },
  { label: 'Max 24h', value: '$68,200' },
];

const initialPosts: CommunityPost[] = [
  {
    id: 1,
    contenido: 'Bitcoin mantiene estructura alcista por encima del soporte semanal.',
    autor: {
      id: 101,
      nombre: 'Laura',
      reputacion: 'Top',
    },
    tags: ['BTC', 'Analisis'],
    fecha: '2026-04-09',
  },
  {
    id: 2,
    contenido: 'Ethereum muestra volumen creciente antes de la apertura americana.',
    autor: {
      id: 102,
      nombre: 'Mateo',
      reputacion: 'Activa',
    },
    tags: ['ETH', 'Volumen'],
    fecha: '2026-04-09',
  },
];

function LayoutBase() {
  const [moneda, setMoneda] = useState<string>('BTC');
  const [publicaciones, setPublicaciones] = useState<CommunityPost[]>(initialPosts);

  const outletContext: DashboardOutletContext = {
    moneda,
    setMoneda,
    publicaciones,
    setPublicaciones,
    stats: initialStats,
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet context={outletContext} />
        </main>
      </div>
    </>
  );
}

export { LayoutBase };
