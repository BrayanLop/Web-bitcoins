import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

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
  { label: 'Ver mercado', to: '/mercado' },
  { label: 'Operar', to: '/operaciones' },
  { label: 'Comunidad', to: '/comunidad' },
];

export function Inicio() {
  const outletContext = useOutletContext();
  const publicaciones = outletContext?.publicaciones ?? [];
  const stats = outletContext?.stats ?? [];

  const featuredPosts = publicaciones.slice(0, 3);
  const featuredStats = stats.slice(0, 3);

  return (
    <section className="home-wall">
      <div className="home-wall-hero">
        <div className="home-wall-hero-copy">
          <span className="home-wall-kicker">CryptoRat</span>
          <h2 className="home-wall-title">Dashboard</h2>
          <p className="home-wall-description">
            Resumen en vivo del mercado, publicaciones destacadas de la comunidad y accesos
            rápidos para operar sin perder tiempo.
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
              <Link className="dashboard-btn-ghost home-wall-link-secondary" to="/comunidad">
                Ver comunidad
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
            <h3 className="home-wall-card-title">Accesos rápidos</h3>
            <div className="home-wall-shortcuts">
              <Link className="home-wall-shortcut" to="/mercado">
                <strong>Mercado</strong>
                <span>Precios y estadísticas en tiempo real.</span>
              </Link>
              <Link className="home-wall-shortcut" to="/historial">
                <strong>Historial</strong>
                <span>Consulta el comportamiento reciente por moneda.</span>
              </Link>
              <Link className="home-wall-shortcut" to="/operaciones">
                <strong>Operar</strong>
                <span>Ejecuta órdenes de compra y venta de BTC.</span>
              </Link>
              <Link className="home-wall-shortcut" to="/tienda">
                <strong>Tienda</strong>
                <span>Explora el catálogo y agrega al carrito.</span>
              </Link>
              <Link className="home-wall-shortcut" to="/perfil">
                <strong>Mi perfil</strong>
                <span>Actualiza tu foto y puntos de reputación.</span>
              </Link>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
