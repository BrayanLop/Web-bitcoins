import type { ReactNode } from 'react';

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="dashboard-card">
      <h3 className="dashboard-card-title">{title}</h3>
      {children}
    </section>
  );
}
