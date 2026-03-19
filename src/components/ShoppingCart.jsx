import { useState } from 'react'

 
export default function ShoppingCart() {
 
  const productosCarrito = [
    { id: 1, nombre: 'Bitcoin', precio: 55 },
    { id: 2, nombre: 'Ethereum', precio: 120 },
    { id: 3, nombre: 'Ripple', precio: 220 },
    { id: 4, nombre: 'Litecoin', precio: 77 },
    { id: 5, nombre: 'Cardano', precio: 67 },
  ]
 
  const [pagado, setPagado] = useState(false)
 
  const total = productosCarrito.reduce((sum, producto) => sum + producto.precio, 0)
 
  return (
    <div className='contenedor-carrito'>
      <div className='card-carrito'>
        <h2 className='titulo-carrito'>Tu carrito</h2>
        {pagado ? (
          <p className='mensaje-compra'>¡Gracias por su compra!</p>
        ) : (
        <div className='detalle-carrito'>
            <ul className='lista-productos'>
            {productosCarrito.map((producto) => (
                <li key={producto.id} className='detalle-producto'>
                <span className='nombre-producto'>{producto.nombre}</span>
                <span className='precio-producto'>{producto.precio}</span>
                </li>
            ))}
            </ul>
 
            <div className='total-carrito'>
            <p className='texto-total-carrito'>
                <strong>Total: {total}</strong>
            </p>
            </div>
 
            <button className='boton-pagar' onClick={()=> setPagado(true)}>
            Pagar Ahora
            </button>
        </div>
        )}
      </div>
    </div>
  )
}