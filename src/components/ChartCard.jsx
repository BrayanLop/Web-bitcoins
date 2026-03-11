import React from 'react';

export function ChartCard() {
  const values = [72, 88, 64, 96, 82, 108, 92];
  const labels = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  return (
    <section className="chart-card">
      <div className="chart-card-header">
        <div>
          <span className="chart-card-kicker">Rendimiento semanal</span>
          <h3 className="chart-card-title">Movimiento del precio</h3>
        </div>
        <strong className="chart-card-change">+6.12%</strong>
      </div>
      <div className="chart-bars">
        {values.map((value, index) => (
          <div key={labels[index]} className="chart-bar-group">
            <div className="chart-bar-track">
              <div className="chart-bar-fill" style={{ height: `${value}%` }} />
            </div>
            <span className="chart-bar-label">{labels[index]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
