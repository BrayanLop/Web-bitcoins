import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { DashboardOutletContext } from '../types';

export default function ShoppingCart() {
  const { cartItems, removeFromCart, clearCart } = useOutletContext<DashboardOutletContext>();
  const [pagado, setPagado] = useState(false);

  const total = cartItems.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

  function handlePay() {
    if (cartItems.length === 0) {
      return;
    }

    setPagado(true);
    clearCart();
  }

  return (
    <div className='contenedor-carrito'>
      <div className='card-carrito'>
        <h2 className='titulo-carrito'>Tu carrito</h2>
        {pagado ? (
          <p className='mensaje-compra'>¡Gracias por su compra!</p>
        ) : (
        <div className='detalle-carrito'>
            <ul className='lista-productos'>
            {cartItems.length === 0 ? (
              <li className='detalle-producto'>No hay productos en el carrito.</li>
            ) : (
            cartItems.map((producto) => (
                <li key={producto.id} className='detalle-producto'>
                <span className='nombre-producto'>{producto.nombre} x {producto.cantidad}</span>
                <span className='precio-producto'>${producto.precio}</span>
                <button className='boton-pagar' type='button' onClick={() => removeFromCart(producto.id)}>
                  Quitar uno
                </button>
                </li>
            ))) }
            </ul>
 
            <div className='total-carrito'>
            <p className='texto-total-carrito'>
                <strong>Total: {total}</strong>
            </p>
            <p className='texto-total-carrito'>Metodo: Cripto</p>
            </div>
 
            <button
              className='boton-pagar'
              type='button'
              onClick={handlePay}
              disabled={cartItems.length === 0}
            >
            Pagar Ahora
            </button>
        </div>
        )}
      </div>
    </div>
  );
}