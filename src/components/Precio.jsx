import React from 'react';
import { StatsCards } from './StatsCards';

export function Precio({ stats }) {
  return (
    <section id="precio">
      <h2>Precio</h2>
      <StatsCards stats={stats} />
    </section>
  );
}
