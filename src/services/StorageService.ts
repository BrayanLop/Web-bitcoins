import { supabase } from "../data/dataContext";

export const uploadToVault = async (file: File) => {
    const { data, error } = await supabase.storage
    .from('test')
    .upload(`user/${Date.now()}.png`, file);

    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('test').getPublicUrl(data.path);
    return publicUrl;
};