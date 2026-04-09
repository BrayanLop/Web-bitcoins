import type { PriceStat } from '../types';

export function StatsCards({ stats }: { stats: PriceStat[] }) {
  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => (
        <article key={idx} className="stat-card">
          <span className="stat-card-label">{stat.label}</span>
          <strong className="stat-card-value">{stat.value}</strong>
        </article>
      ))}
    </div>
  );
}
