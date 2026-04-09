import type { CommunityPost } from '../types';

export function TaskList({ items }: { items: CommunityPost[] }) {
  return (
    <ul className="activity-list">
      {items.length === 0 ? (
        <li className="activity-list-empty">Aun no hay publicaciones. Usa el panel para crear la primera.</li>
      ) : (
        items.map((item) => (
          <li key={item.id} className="activity-item">
            <strong>{item.autor.nombre}</strong>: {item.contenido}
            <div>{item.tags.join(' · ')}</div>
          </li>
        ))
      )}
    </ul>
  );
}
