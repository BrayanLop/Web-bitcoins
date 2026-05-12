import { Link, useOutletContext } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAssets } from '../hooks/useAssets';
import type { DashboardOutletContext, Product } from '../types';
import type { Asset } from '../types/Asset';
import { useState } from 'react';
import '../styles/Productos.css';

function Productos() {
  const { addToCart } = useOutletContext<DashboardOutletContext>();
  const { data: productos, loading, error } = useFetch<Product[]>('https://fakestoreapi.com/products');
  
  // Hook CRUD para assets
  const { assets, handleCreate, handleDelete, handleEdit, handleSave, editedImage } = useAssets();
  
  // Estados para crear/editar asset
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
  });

  // Crear un nuevo asset
  const handleCreateAsset = () => {
    if (!formData.name || !file) {
      alert('Nombre y archivo son requeridos');
      return;
    }
    
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: formData.name,
      amount: formData.amount,
      file_path: file.name,
      created_at: new Date().toISOString(),
    };
    
    handleCreate(newAsset);
    resetForm();
  };

  // Actualizar un asset
  const handleUpdateAsset = () => {
    if (!editedImage || !formData.name) {
      alert('Nombre es requerido');
      return;
    }
    
    handleSave({
      ...editedImage,
      name: formData.name,
      amount: formData.amount,
      file_path: file?.name || editedImage.file_path,
    });
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', amount: 0 });
    setFile(null);
    setShowForm(false);
  };

  const startEdit = (asset: Asset) => {
    handleEdit(asset);
    setFormData({ name: asset.name, amount: asset.amount });
    setShowForm(true);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container-productos'>
      <h2 className='titulo-productos'>Nuestros Productos</h2>
      
      {/* Sección de Assets */}
      <div className='assets-section'>
        <div className='assets-header'>
          <h3>📁 Gestor de Assets</h3>
          <button 
            onClick={() => {
              if (editedImage) resetForm();
              setShowForm(!showForm);
            }}
            className='btn-add-asset'
          >
            {showForm ? '✕ Cancelar' : '➕ Nuevo Asset'}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className='asset-form'>
            <h4>{editedImage ? '✏️ Editar Asset' : '➕ Crear Nuevo Asset'}</h4>
            
            <div className='form-group'>
              <label>Nombre del Asset *</label>
              <input
                type="text"
                placeholder="Ej: Imagen de portada"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className='form-group'>
              <label>Cantidad</label>
              <input
                type="number"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                min="0"
              />
            </div>

            <div className='form-group'>
              <label>Archivo *</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file && <small className='file-info'>📄 {file.name} ({(file.size / 1024).toFixed(2)} KB)</small>}
            </div>

            <div className='form-buttons'>
              <button
                onClick={editedImage ? handleUpdateAsset : handleCreateAsset}
                className='btn-submit'
              >
                {editedImage ? '💾 Actualizar' : '✅ Crear'}
              </button>
              <button
                onClick={resetForm}
                className='btn-cancel'
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Assets */}
        {assets.length > 0 ? (
          <div className='assets-grid'>
            {assets.map((asset) => (
              <div key={asset.id} className={`asset-card ${editedImage?.id === asset.id ? 'active' : ''}`}>
                <div className='asset-header-card'>
                  <h4>📦 {asset.name}</h4>
                  <span className='asset-id'>ID: {asset.id}</span>
                </div>
                
                <div className='asset-info'>
                  <p><strong>Archivo:</strong> {asset.file_path}</p>
                  <p><strong>Cantidad:</strong> {asset.amount}</p>
                  <p className='asset-date'>{new Date(asset.created_at).toLocaleDateString()}</p>
                </div>

                <div className='asset-actions'>
                  <button
                    onClick={() => startEdit(asset)}
                    className='btn-edit'
                    title="Editar asset"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className='btn-delete'
                    title="Eliminar asset"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='empty-state'>📭 No hay assets. ¡Crea uno nuevo!</p>
        )}
      </div>

      {/* Sección de Productos */}
      <div className='productos-section'>
        <h3>🛍️ Catálogo de Productos</h3>
        {productos && productos.length > 0 ? (
          <ul className='lista-productos'>
            {productos.map((producto) => (
              <li key={producto.id} className='detalle-producto'>
                <span className='producto-title'>{producto.title}</span>
                <span className='producto-price'>${producto.price}</span>
                <div className='producto-actions'>
                  <button 
                    type='button' 
                    className='ver-mas-btn agregar-btn' 
                    onClick={() => addToCart(producto)}
                  >
                    🛒 Agregar
                  </button>
                  <Link to={`/product/${producto.id}`} className="ver-mas-btn">
                    👁️ Ver Más
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export { Productos };