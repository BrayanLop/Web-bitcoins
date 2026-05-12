import { useState, useEffect } from 'react';
import { Asset } from '../types/Asset';

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editedImage, setEditedImage] = useState<Asset | null>(null);

  // CREATE - Agregar un nuevo asset
  const handleCreate = (newAsset: Asset) => {
    setAssets(prevAssets => [...prevAssets, newAsset]);
  };

  // READ - Obtener un asset por ID
  const handleGetById = (id: string): Asset | undefined => {
    return assets.find(asset => asset.id === id);
  };

  // UPDATE - Editar un asset
  const handleEdit = (image: Asset) => {
    setEditedImage(image);
  };

  const handleSave = (updatedImage: Asset) => {
    setAssets(prevAssets =>
      prevAssets.map(asset => (asset.id === updatedImage.id ? updatedImage : asset))
    );
    setEditedImage(null);
  };

  // DELETE - Eliminar un asset por ID
  const handleDelete = (id: string) => {
    setAssets(prevAssets => prevAssets.filter(asset => asset.id !== id));
    if (editedImage?.id === id) {
      setEditedImage(null);
    }
  };

  // DELETE ALL - Limpiar todos los assets
  const handleDeleteAll = () => {
    setAssets([]);
    setEditedImage(null);
  };

  return {
    // States
    assets,
    editedImage,
    
    // Setters
    setAssets,
    setEditedImage,
    
    // CRUD Operations
    handleCreate,    // CREATE
    handleGetById,   // READ
    handleEdit,      // UPDATE (Iniciar edición)
    handleSave,      // UPDATE (Guardar cambios)
    handleDelete,    // DELETE (Por ID)
    handleDeleteAll, // DELETE ALL
  };
};
