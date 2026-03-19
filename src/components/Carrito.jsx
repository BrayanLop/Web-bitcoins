import { useState } from "react";

export function Carrito({ productos }) {
  const [carrito, setCarrito] = useState([]);

  function agregarProducto(producto) {
    setCarrito([...carrito, producto]);
  }

  function eliminarProducto(index) {
    setCarrito(carrito.filter((e, i) => i !== index));
  }

  return (
    <div>
      <h4>Productos disponibles</h4>
      <ul>
        {productos.map((producto, idx) => (
          <li key={idx}>
            {producto}
            <button onClick={() => agregarProducto(producto)} style={{marginLeft:8}}>Agregar</button>
          </li>
        ))}
      </ul>
      <h4>Carrito</h4>
      <ul>
        {carrito.length === 0 ? (
          <li>No hay productos en el carrito.</li>
        ) : (
          carrito.map((producto, idx) => (
            <li key={idx}>
              {producto}
              <button onClick={() => eliminarProducto(idx)} style={{marginLeft:8}}>Eliminar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
