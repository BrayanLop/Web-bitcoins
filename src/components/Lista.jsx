function Lista({ idLista, items, aplicaEliminar }) {
    return (
        <ul id={idLista} className="todo-list">
            {items.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                    {typeof item === "object" && item !== null ? (
                        <>
                            {item.texto} <span className="todo-badge">{item.categoria}</span>
                        </>
                    ) : (
                        item
                    )}
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
