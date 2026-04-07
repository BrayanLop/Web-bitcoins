import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  return (
    <div className="detalle-producto-individual">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ maxWidth: 200 }} />
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
    </div>
  );
}
