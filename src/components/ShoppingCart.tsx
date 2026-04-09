import { useState } from 'react';
import type { ShoppingCartState } from '../types';

const initialCart: ShoppingCartState = {
  items: [
    { id: 1, nombre: 'Bitcoin', precio: 55, cantidad: 1 },
    { id: 2, nombre: 'Ethereum', precio: 120, cantidad: 1 },
    { id: 3, nombre: 'Ripple', precio: 220, cantidad: 1 },
    { id: 4, nombre: 'Litecoin', precio: 77, cantidad: 1 },
    { id: 5, nombre: 'Cardano', precio: 67, cantidad: 1 },
  ],
  pagado: false,
  pago: {
    moneda: 'USD',
    metodo: 'Cripto',
    confirmado: false,
  },
};

export default function ShoppingCart() {
  const [cart, setCart] = useState<ShoppingCartState>(initialCart);

  const total = cart.items.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

  return (
    <div className='contenedor-carrito'>
      <div className='card-carrito'>
        <h2 className='titulo-carrito'>Tu carrito</h2>
        {cart.pagado ? (
          <p className='mensaje-compra'>¡Gracias por su compra!</p>
        ) : (
        <div className='detalle-carrito'>
            <ul className='lista-productos'>
            {cart.items.map((producto) => (
                <li key={producto.id} className='detalle-producto'>
                <span className='nombre-producto'>{producto.nombre} x {producto.cantidad}</span>
                <span className='precio-producto'>${producto.precio}</span>
                </li>
            ))}
            </ul>
 
            <div className='total-carrito'>
            <p className='texto-total-carrito'>
                <strong>Total: {total}</strong>
            </p>
            <p className='texto-total-carrito'>Metodo: {cart.pago.metodo}</p>
            </div>
 
            <button
              className='boton-pagar'
              onClick={() => setCart((currentCart) => ({
                ...currentCart,
                pagado: true,
                pago: {
                  ...currentCart.pago,
                  confirmado: true,
                },
              }))}
            >
            Pagar Ahora
            </button>
        </div>
        )}
      </div>
    </div>
  );
}