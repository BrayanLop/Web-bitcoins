import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { DashboardOutletContext } from '../types';

export function Comunidad() {
  const { publicaciones, setPublicaciones } = useOutletContext<DashboardOutletContext>();
  const [texto, setTexto] = useState('');
  const [tag, setTag] = useState('');

  function handlePost() {
    if (!texto.trim()) return;
    const nueva = {
      id: Date.now(),
      contenido: texto.trim(),
      autor: { id: 0, nombre: 'Tú', reputacion: 'Activa' as const },
      tags: tag.trim() ? [tag.trim().replace('#', '')] : [],
      fecha: new Date().toISOString().split('T')[0],
    };
    setPublicaciones([nueva, ...publicaciones]);
    setTexto('');
    setTag('');
  }

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 0.35rem', fontWeight: 700 }}>Comunidad</h2>
        <p style={{ color: '#8ea4c8', fontSize: '0.88rem', margin: 0 }}>
          Comparte análisis, ideas y señales con otros traders.
        </p>
      </div>

      {/* Formulario nueva publicación */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#fff', fontSize: '0.95rem', margin: '0 0 1rem', fontWeight: 600 }}>Nueva publicación</h3>
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="¿Qué está pasando en el mercado? Comparte tu análisis..."
          rows={3}
          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(6,14,27,0.7)', color: '#eef4ff', fontSize: '0.9rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', alignItems: 'center' }}>
          <input
            type="text"
            value={tag}
            onChange={e => setTag(e.target.value)}
            placeholder="Tag (ej: BTC)"
            style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(6,14,27,0.7)', color: '#eef4ff', fontSize: '0.85rem', outline: 'none', width: '140px' }}
          />
          <button
            onClick={handlePost}
            disabled={!texto.trim()}
            style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: '#4f6ef7', color: '#fff', fontWeight: 600, fontSize: '0.875rem', cursor: texto.trim() ? 'pointer' : 'not-allowed', opacity: texto.trim() ? 1 : 0.5 }}
          >
            Publicar
          </button>
        </div>
      </div>

      {/* Lista de publicaciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {publicaciones.length === 0 ? (
          <p style={{ color: '#8ea4c8', textAlign: 'center', padding: '2rem 0' }}>Aún no hay publicaciones.</p>
        ) : (
          publicaciones.map(post => (
            <article key={post.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{post.autor.nombre}</strong>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(79,110,247,0.2)', color: '#7c9ef7', padding: '0.15rem 0.5rem', borderRadius: '20px' }}>
                    {post.autor.reputacion}
                  </span>
                </div>
                <time style={{ color: '#8ea4c8', fontSize: '0.78rem' }}>{post.fecha}</time>
              </div>
              <p style={{ color: '#cdd8f0', fontSize: '0.9rem', margin: '0 0 0.6rem', lineHeight: 1.5 }}>{post.contenido}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', color: '#4f6ef7', background: 'rgba(79,110,247,0.1)', padding: '0.15rem 0.5rem', borderRadius: '20px' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
