import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '../schemas/UserValidator';
import { useImagePreview } from '../hooks/useImagePreview';
import { uploadToVault } from '../services/StorageService';
import { supabase } from '../data/dataContext';

export function Perfil() {
  const { preview, onFileSelected, clearPreview, fileInputRef } = useImagePreview();
  const [submitStatus, setSubmitStatus] = useState<null | 'loading' | 'success' | 'error'>(null);
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
    defaultValues: { points: 1 },
  });

  const onSubmit = async (data: any) => {
    setSubmitStatus('loading');
    setSubmitError('');
    try {
      const file = fileInputRef.current?.files?.[0];
      let avatarUrl = null;

      if (file) {
        avatarUrl = await uploadToVault(file);
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({ points: data.points, avatar_url: avatarUrl });

      if (error) throw error;

      setSubmitStatus('success');
      reset();
      clearPreview();
    } catch (err: any) {
      setSubmitStatus('error');
      setSubmitError(err?.message ?? 'Ocurrió un error al guardar.');
    }
  };

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 0.35rem', fontWeight: 700 }}>Mi Perfil</h2>
        <p style={{ color: '#8ea4c8', fontSize: '0.88rem', margin: 0 }}>
          Actualiza tu foto de perfil y puntos de reputación.
        </p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '18px', padding: '2rem' }}>

        {preview && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <img
              src={preview}
              alt="Vista previa"
              style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '3px solid #4f6ef7', boxShadow: '0 0 20px rgba(79,110,247,0.3)' }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#8ea4c8', marginBottom: '0.4rem', fontWeight: 500 }}>
              Foto de perfil
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileSelected}
              style={{ width: '100%', fontSize: '0.85rem', color: '#ccc' }}
            />
            {preview && (
              <button
                type="button"
                onClick={clearPreview}
                style={{ marginTop: '0.5rem', fontSize: '0.78rem', background: 'none', border: '1px solid #e74c3c', color: '#e74c3c', borderRadius: '6px', padding: '0.3rem 0.75rem', cursor: 'pointer' }}
              >
                Limpiar imagen
              </button>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#8ea4c8', marginBottom: '0.4rem', fontWeight: 500 }}>
              Puntos de reputación
            </label>
            <input
              type="number"
              placeholder="Ej: 100"
              {...register('points', { valueAsNumber: true })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(6,14,27,0.7)', color: '#eef4ff', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
            />
            {errors.points && (
              <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{String(errors.points.message)}</span>
            )}
          </div>

          {submitStatus === 'success' && (
            <p style={{ color: '#2ecc71', fontSize: '0.85rem', margin: 0, padding: '0.5rem 0.75rem', background: 'rgba(46,204,113,0.1)', borderRadius: '8px', border: '1px solid rgba(46,204,113,0.3)' }}>
              Perfil guardado correctamente.
            </p>
          )}
          {submitStatus === 'error' && (
            <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: 0, padding: '0.5rem 0.75rem', background: 'rgba(231,76,60,0.1)', borderRadius: '8px', border: '1px solid rgba(231,76,60,0.3)' }}>
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            style={{ padding: '0.75rem', borderRadius: '10px', border: 'none', background: '#4f6ef7', color: '#fff', fontWeight: 600, fontSize: '0.95rem', cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer', opacity: submitStatus === 'loading' ? 0.7 : 1 }}
          >
            {submitStatus === 'loading' ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </section>
  );
}
