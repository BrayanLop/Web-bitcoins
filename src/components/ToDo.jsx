import React, { useState } from 'react';
import { Lista } from './Lista';

function ToDo() {

      const [textoTarea, setTextoTarea] = useState("");
      const [categorias, setCategorias] = useState([ "categoria1", "categoria2", "categoria3" ]);
      const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categorias[0]);
      const [listaTareas, setListaTareas] = useState([]);

      function agregarLista() {
            if (textoTarea) {
            setListaTareas([...listaTareas, { texto: textoTarea, categoria: categoriaSeleccionada }]);
            setTextoTarea("");
            }
        }
    
      function eliminarTarea(index) {
            const nuevasTareas = [...listaTareas];
            nuevasTareas.splice(index, 1);
            setListaTareas(nuevasTareas);
        }

    return (
        <>
            <div className='todo-input-row' style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '1rem' }}>
              <input id="texto-tarea"
                    type="text"
                    placeholder="Escribe una tarea..."
                    className="dashboard-input todo-input"
                    value={textoTarea}
                    onChange={e => setTextoTarea(e.target.value)}
              />

              <select
                id="categorias"
                className="dashboard-input todo-select"
                value={categoriaSeleccionada}
                onChange={e => setCategoriaSeleccionada(e.target.value)}
              >
                {categorias.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <button className="dashboard-btn-primary todo-btn" type="button" onClick={agregarLista}>+ Agregar</button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              {listaTareas.length === 4 && (
                <div style={{
                  background: '#d4edda',
                  color: '#155724',
                  padding: '0.75rem 1rem',
                  borderRadius: '5px',
                  border: '1px solid #c3e6cb',
                  fontWeight: 'bold',
                  className: 'todo-alert'
                }}>
                  Coronaste, Has cumplido con 4 tareas.
                </div>
              )}
            </div>

            <Lista id="lista-tareas" items={listaTareas} aplicaEliminar={eliminarTarea} />
        </>
    );
}


export { ToDo };