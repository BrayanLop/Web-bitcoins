import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '../schemas/UserValidator';
import { useImagePreview } from '../hooks/useImagePreview';
import { uploadToVault } from "../services/StorageService";
import { supabase } from "../data/dataContext";

const activityItems = [
  {
    title: 'Ritmo del mercado',
    description: 'La volatilidad se concentra en BTC y ETH durante la apertura de Nueva York.',
    tone: 'up',
    meta: 'Actualizado hace 8 min',
  },
  {
    title: 'Oportunidad en watchlist',
    description: 'Tres activos rompieron resistencia intradía y están entrando en zona de confirmación.',
    tone: 'neutral',
    meta: 'Seguimiento automático',
  },
  {
    title: 'Alerta de riesgo',
    description: 'Subió el volumen vendedor en altcoins de baja capitalización. Conviene ajustar exposición.',
    tone: 'down',
    meta: 'Radar de comunidad',
  },
];

const quickAccess = [
  { label: 'Ver precios', to: '/precio' },
  { label: 'Entrar a comunidad', to: '/comentarios' },
  { label: 'Revisar tareas', to: '/tareas' },
];

export function Inicio() {
  const outletContext = useOutletContext();
  const publicaciones = outletContext?.publicaciones ?? [];
  const stats = outletContext?.stats ?? [];

  const { preview, onFileSelected, clearPreview, fileInputRef } = useImagePreview();
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
    defaultValues: { points: 1 },
  });

  const onSubmit = async (data) => {
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
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err?.message ?? 'Ocurrió un error al guardar.');
    }
  };

  const featuredPosts = publicaciones.slice(0, 3);
  const featuredStats = stats.slice(0, 3);

  return (
    <section className="home-wall">
      <div className="home-wall-hero">
        <div className="home-wall-hero-copy">
          <span className="home-wall-kicker">CryptoRat</span>
          <h2 className="home-wall-title">Bitcoin</h2>
          <p className="home-wall-description">
            Aquí tienes un resumen vivo del mercado, publicaciones destacadas de la comunidad y accesos
            rápidos para seguir operando sin entrar pantalla por pantalla.
          </p>

          <div className="home-wall-actions">
            {quickAccess.map((item) => (
              <Link key={item.to} className="dashboard-btn-primary home-wall-link" to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="home-wall-hero-panel">
          <span className="home-wall-panel-label">Pulse del día</span>
          <div className="home-wall-pulse-grid">
            {featuredStats.map((stat) => (
              <article key={stat.label} className="home-wall-pulse-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </article>
            ))}
          </div>
          <div className="home-wall-signal">
            <span className="home-wall-signal-dot" />
            Sesión activa con foco en momentum y seguimiento de comunidad.
          </div>
        </div>
      </div>

      <div className="home-wall-grid">
        <div className="home-wall-column">
          <article className="home-wall-card">
            <div className="home-wall-card-header">
              <div>
                <span className="home-wall-card-kicker">Feed principal</span>
                <h3 className="home-wall-card-title">Lo que se está comentando ahora</h3>
              </div>
              <Link className="dashboard-btn-ghost home-wall-link-secondary" to="/comentarios">
                Ver muro completo
              </Link>
            </div>

            <div className="home-wall-feed">
              {featuredPosts.map((post) => (
                <article key={post.id} className="home-wall-post">
                  <div className="home-wall-post-top">
                    <div>
                      <strong className="home-wall-post-author">{post.autor.nombre}</strong>
                      <span className="home-wall-post-badge">{post.autor.reputacion}</span>
                    </div>
                    <time className="home-wall-post-date">{post.fecha}</time>
                  </div>
                  <p className="home-wall-post-content">{post.contenido}</p>
                  <div className="home-wall-post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className="home-wall-card">
            <div className="home-wall-card-header">
              <div>
                <span className="home-wall-card-kicker">Radar</span>
                <h3 className="home-wall-card-title">Actividad prioritaria</h3>
              </div>
            </div>

            <div className="home-wall-activity-list">
              {activityItems.map((item) => (
                <article key={item.title} className={`home-wall-activity home-wall-activity-${item.tone}`}>
                  <div className="home-wall-activity-mark" />
                  <div>
                    <div className="home-wall-activity-top">
                      <strong>{item.title}</strong>
                      <span>{item.meta}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>

        <aside className="home-wall-side">
          <article className="home-wall-card home-wall-note-card">
            <span className="home-wall-card-kicker">Enfoque rápido</span>
            <h3 className="home-wall-card-title">Checklist de la sesión</h3>
            <ul className="home-wall-checklist">
              <li>Validar tendencia principal antes de abrir nuevas posiciones.</li>
              <li>Contrastar publicaciones con volumen y niveles clave.</li>
              <li>Revisar tareas pendientes antes del cierre de sesión.</li>
            </ul>
          </article>

          <article className="home-wall-card home-wall-mini-card">
            <span className="home-wall-card-kicker">Atajos</span>
            <h3 className="home-wall-card-title">Siguiente paso</h3>
            <div className="home-wall-shortcuts">
              <Link className="home-wall-shortcut" to="/productos">
                <strong>Productos</strong>
                <span>Explora el catálogo y agrega al carrito.</span>
              </Link>
              <Link className="home-wall-shortcut" to="/historial">
                <strong>Historial</strong>
                <span>Consulta el comportamiento reciente por moneda.</span>
              </Link>
              <Link className="home-wall-shortcut" to="/nexus">
                <strong>Nexus</strong>
                <span>Abre el panel extendido con balance y actividad.</span>
              </Link>
            </div>
          </article>
          <article className="home-wall-card home-wall-mini-card">
            <span className="home-wall-card-kicker">Perfil rápido</span>
            <h3 className="home-wall-card-title">Puntos e imagen</h3>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', marginBottom: '0.25rem', display: 'block' }}>Puntos</label>
                <input
                  type="number"
                  placeholder="Ingresa tus puntos"
                  {...register('points', { valueAsNumber: true })}
                  style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #333', background: '#1a1a2e', color: '#fff' }}
                />
                {errors.points && <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{errors.points.message}</span>}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', marginBottom: '0.25rem', display: 'block' }}>Imagen</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileSelected}
                  style={{ width: '100%', fontSize: '0.8rem' }}
                />

                {preview && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: '8px', maxHeight: '140px', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={clearPreview}
                      style={{ marginTop: '0.4rem', width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #e74c3c', background: 'transparent', color: '#e74c3c', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Limpiar imagen
                    </button>
                  </div>
                )}
              </div>

              {submitStatus === 'success' && (
                <span style={{ color: '#2ecc71', fontSize: '0.8rem' }}>Guardado correctamente.</span>
              )}
              {submitStatus === 'error' && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{submitError}</span>
              )}

              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                style={{ padding: '0.4rem', borderRadius: '6px', border: 'none', background: '#4f6ef7', color: '#fff', cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer', fontSize: '0.8rem', opacity: submitStatus === 'loading' ? 0.7 : 1 }}
              >
                {submitStatus === 'loading' ? 'Guardando...' : 'Guardar'}
              </button>
            </form>
          </article>
        </aside>
      </div>
    </section>
  );
}
