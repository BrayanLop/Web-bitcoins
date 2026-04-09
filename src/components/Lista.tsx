import type { TaskItem } from '../types';

function Lista({
    idLista,
    items,
    aplicaEliminar,
}: {
    idLista?: string;
    items: TaskItem[];
    aplicaEliminar?: (index: number) => void;
}) {
    return (
        <ul id={idLista} className="todo-list">
            {items.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                    {item.texto} <span className="todo-badge">{item.categoria}</span>
                </span>
                {aplicaEliminar && (
                    <button
                    className="dashboard-btn-ghost todo-delete-btn"
                    title="Eliminar"
                    onClick={() => aplicaEliminar(index)}
                    >
                    🗑️
                    </button>
                )}
                </li>  
          ))}
        </ul>
    );
}

export { Lista }
