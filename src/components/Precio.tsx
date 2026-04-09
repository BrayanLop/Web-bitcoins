import { StatsCards } from './StatsCards';
import type { PriceStat } from '../types';

export function Precio({ stats }: { stats: PriceStat[] }) {
  return (
    <section id="precio">
      <h2>Precio</h2>
      <StatsCards stats={stats} />
    </section>
  );
}
