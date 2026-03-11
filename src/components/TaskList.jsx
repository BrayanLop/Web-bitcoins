import React from 'react';

export function TaskList({ items }) {
  return (
    <ul className="activity-list">
      {items.length === 0 ? (
        <li className="activity-list-empty">Aun no hay publicaciones. Usa el panel para crear la primera.</li>
      ) : (
        items.map((item, idx) => (
          <li key={idx} className="activity-item">{item}</li>
        ))
      )}
    </ul>
  );
}
