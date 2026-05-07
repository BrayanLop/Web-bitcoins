import { StatsCards } from './StatsCards';
import { ChartCard } from './ChartCard';
import type { PriceStat } from '../types';

export function Precio({ stats }: { stats: PriceStat[] }) {
  return (
    <section id="mercado" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem 0' }}>
      <div>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 0.35rem', fontWeight: 700 }}>Mercado</h2>
        <p style={{ color: '#8ea4c8', fontSize: '0.88rem', margin: 0 }}>
          Estadísticas en tiempo real de los principales activos.
        </p>
      </div>
      <StatsCards stats={stats} />
      <ChartCard />
    </section>
  );
}
