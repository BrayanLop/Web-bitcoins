import { supabase } from "../data/dataContext";
import { Asset } from "../types/Asset";

/**
 * Servicio para operaciones CRUD de Assets en Supabase
 */

// CREATE - Agregar un nuevo asset
export const createAsset = async (asset: Asset): Promise<Asset> => {
  const { data, error } = await supabase
    .from('assets')
    .insert([asset])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// READ - Obtener todos los assets
export const getAssets = async (): Promise<Asset[]> => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error de Supabase:', error.message, error.code);
      throw new Error(`Error al obtener assets: ${error.message}`);
    }
    return data || [];
  } catch (err) {
    console.error('Error en getAssets:', err);
    throw err;
  }
};

// READ - Obtener un asset por ID
export const getAssetById = async (id: string): Promise<Asset | null> => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No encontrado
    throw error;
  }
  return data;
};

// UPDATE - Actualizar un asset
export const updateAsset = async (id: string, updates: Partial<Asset>): Promise<Asset> => {
  const { data, error } = await supabase
    .from('assets')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// DELETE - Eliminar un asset por ID
export const deleteAsset = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('assets')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// DELETE ALL - Eliminar todos los assets
export const deleteAllAssets = async (): Promise<void> => {
  const { error } = await supabase
    .from('assets')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Elimina todos

  if (error) throw error;
};
