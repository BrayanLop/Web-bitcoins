import React from 'react';

export function Card({ title, children }) {
  return (
    <section className="dashboard-card">
      <h3 className="dashboard-card-title">{title}</h3>
      {children}
    </section>
  );
}
