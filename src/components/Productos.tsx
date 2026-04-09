import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { Product } from '../types';

function Productos() {
  const { data: productos, loading, error } = useFetch<Product[]>('https://fakestoreapi.com/products');

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!productos) return <p>No hay productos disponibles.</p>;

  return (
    <div className='container-productos'>
      <h2 className='titulo-productos'>Nuestros Productos</h2>
      <ul className='lista-productos'>
        {productos.map((producto) => (
          <li key={producto.id} className='detalle-producto'>
            <span>{producto.title}</span> - <span>${producto.price}</span>
            <Link to={`/product/${producto.id}`} className="ver-mas-btn" style={{ marginLeft: 10 }}>
              Ver Más
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Productos };