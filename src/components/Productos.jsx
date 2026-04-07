import React, { useState } from 'react';

function Productos() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto A', precio: 10 },
    { id: 2, nombre: 'Producto B', precio: 20 },
    { id: 3, nombre: 'Producto C', precio: 30 },
  ]);

  return (
    <div className='container-productos'>
      <h2 className='titulo-productos'>Nuestros Productos</h2>
      <ul className='lista-productos'>
        {productos.map(producto => (
          <li key={producto.id} className='detalle-producto'>
            <span>{producto.nombre}</span> - <span>${producto.precio}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Productos };