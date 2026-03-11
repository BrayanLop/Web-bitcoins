import React from 'react';

export function StatsCards({ stats }) {
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
