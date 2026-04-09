import { useState } from 'react';
import { Lista } from './Lista';
import type { TaskDraft, TaskItem } from '../types';

const initialCategories: string[] = ['categoria1', 'categoria2', 'categoria3'];

function ToDo() {
  const [categorias] = useState<string[]>(initialCategories);
  const [formulario, setFormulario] = useState<TaskDraft>({
    texto: '',
    categoria: initialCategories[0],
  });
  const [listaTareas, setListaTareas] = useState<TaskItem[]>([]);

      function agregarLista() {
    if (formulario.texto.trim()) {
    setListaTareas([
      ...listaTareas,
      {
        id: Date.now(),
        texto: formulario.texto,
        categoria: formulario.categoria,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setFormulario({ texto: '', categoria: formulario.categoria });
            }
        }
    
  function eliminarTarea(index: number) {
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
                    value={formulario.texto}
                    onChange={(event) => setFormulario({
                      ...formulario,
                      texto: event.target.value,
                    })}
              />

              <select
                id="categorias"
                className="dashboard-input todo-select"
                value={formulario.categoria}
                onChange={(event) => setFormulario({
                  ...formulario,
                  categoria: event.target.value,
                })}
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
                }}>
                  Coronaste, Has cumplido con 4 tareas.
                </div>
              )}
            </div>

            <Lista idLista="lista-tareas" items={listaTareas} aplicaEliminar={eliminarTarea} />
        </>
    );
}


export { ToDo };