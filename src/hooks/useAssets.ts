import { useState, useEffect } from 'react';
import { Asset } from '../types/Asset';
import { 
  getAssets, 
  createAsset as createAssetDB,
  updateAsset as updateAssetDB,
  deleteAsset as deleteAssetDB,
  deleteAllAssets as deleteAllAssetsDB
} from '../services/AssetService';

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editedImage, setEditedImage] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar assets al montar el componente
  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAssets();
      setAssets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar assets';
      setError(errorMessage);
      console.error('Error loading assets:', err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE - Agregar un nuevo asset
  const handleCreate = async (newAsset: Asset) => {
    try {
      setError(null);
      const createdAsset = await createAssetDB(newAsset);
      setAssets(prevAssets => [createdAsset, ...prevAssets]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear asset';
      setError(errorMessage);
      console.error('Error creating asset:', err);
      throw err;
    }
  };

  // READ - Obtener un asset por ID
  const handleGetById = (id: string): Asset | undefined => {
    return assets.find(asset => asset.id === id);
  };

  // UPDATE - Editar un asset
  const handleEdit = (image: Asset) => {
    setEditedImage(image);
  };

  const handleSave = async (updatedImage: Asset) => {
    try {
      setError(null);
      const savedAsset = await updateAssetDB(updatedImage.id, updatedImage);
      setAssets(prevAssets =>
        prevAssets.map(asset => (asset.id === updatedImage.id ? savedAsset : asset))
      );
      setEditedImage(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar asset';
      setError(errorMessage);
      console.error('Error updating asset:', err);
      throw err;
    }
  };

  // DELETE - Eliminar un asset por ID
  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await deleteAssetDB(id);
      setAssets(prevAssets => prevAssets.filter(asset => asset.id !== id));
      if (editedImage?.id === id) {
        setEditedImage(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar asset';
      setError(errorMessage);
      console.error('Error deleting asset:', err);
      throw err;
    }
  };

  // DELETE ALL - Limpiar todos los assets
  const handleDeleteAll = async () => {
    try {
      setError(null);
      await deleteAllAssetsDB();
      setAssets([]);
      setEditedImage(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar todos los assets';
      setError(errorMessage);
      console.error('Error deleting all assets:', err);
      throw err;
    }
  };

  return {
    // States
    assets,
    editedImage,
    loading,
    error,
    
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
    loadAssets,      // Recargar assets
  };
};
