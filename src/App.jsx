import { useState } from 'react';
import { Layout } from './components/Layout';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Card } from './components/Card';
import { TaskList } from './components/TaskList';
import { StatsCards } from './components/StatsCards';
import { ChartCard } from './components/ChartCard';
import './App.css';

function App() {
  const [moneda, setMoneda] = useState("");
  const [texto, setTexto] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const stats = [
    { label: 'Precio Actual', value: '$67,500' },
    { label: 'Volumen 24h', value: '1.2B USD' },
    { label: 'ATH', value: '$69,000' },
    { label: 'Min 24h', value: '$66,000' },
    { label: 'Max 24h', value: '$68,200' },
  ];

  function publicar(e) {
    e.preventDefault();
    if (texto.trim() === "") return;
    setPublicaciones([...publicaciones, texto]);
    setTexto("");
  }

  return (
    <Layout>
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <section className="hero-panel" id="inicio">
            <div className="hero-copy">
              <span className="hero-eyebrow">Mercado en tiempo real</span>
              <h1 className="hero-title">Panel profesional para seguir Bitcoin con una vista clara y ordenada.</h1>
              <p className="hero-description">
                Visualiza el precio, la variación semanal y la actividad reciente en una sola pantalla, sin elementos montados ni bloques desordenados.
              </p>
              <div className="hero-actions">
                <button className="dashboard-btn-primary" type="button">Ver mercado</button>
                <button className="dashboard-btn-ghost" type="button">Exportar resumen</button>
              </div>
            </div>
            <div className="hero-aside">
              <div className="hero-price-card">
                <span className="hero-price-label">BTC / USD</span>
                <strong className="hero-price-value">$67,500</strong>
                <span className="hero-price-change">+2.48% en las ultimas 24h</span>
              </div>
              <ChartCard />
            </div>
          </section>

          <section className="dashboard-section" id="precio">
            <StatsCards stats={stats} />
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-column">
              <Card title="Detalle del mercado">
                <div className="market-highlights">
                  <div className="market-highlight">
                    <span>Sesgo</span>
                    <strong>Alcista moderado</strong>
                  </div>
                  <div className="market-highlight">
                    <span>Riesgo</span>
                    <strong>Volatilidad media</strong>
                  </div>
                </div>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Max/Min 24h</th>
                      <th>ATH</th>
                      <th>Volumen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>$68,200 / $66,000</td>
                      <td>$69,000</td>
                      <td>1.2B USD</td>
                    </tr>
                  </tbody>
                </table>
                <ul className="dashboard-variation-list">
                  <li><span>24h</span><strong>+2.48%</strong></li>
                  <li><span>7d</span><strong>+6.12%</strong></li>
                  <li><span>30d</span><strong>+14.38%</strong></li>
                </ul>
              </Card>

              <Card title="Publicar actualizacion">
                <form onSubmit={publicar} className="dashboard-form">
                  <textarea
                    value={texto}
                    onChange={e => setTexto(e.target.value)}
                    placeholder="Escribe una actualizacion para tu panel..."
                    maxLength={280}
                    className="dashboard-textarea"
                  />
                  <div className="dashboard-form-footer">
                    <span>{texto.length}/280</span>
                    <button
                      type="submit"
                      disabled={texto.trim() === "" || texto.length === 280}
                      className="dashboard-btn-primary"
                    >
                      Publicar
                    </button>
                  </div>
                </form>
              </Card>

              <div id="comentarios">
                <Card title="Comunidad">
                  <TaskList items={publicaciones} />
                </Card>
              </div>
            </div>

            <div className="dashboard-column">
              <div id="historial">
                <Card title="Historial">
                  <form className="dashboard-filter-form">
                    <label htmlFor="moneda">Moneda</label>
                    <input
                      id="moneda"
                      value={moneda}
                      onChange={e => setMoneda(e.target.value)}
                      type="text"
                      placeholder="BTC"
                      className="dashboard-input"
                    />
                    <label htmlFor="dias">Periodo</label>
                    <select id="dias" className="dashboard-input">
                      <option>7 dias</option>
                      <option>14 dias</option>
                      <option>30 dias</option>
                    </select>
                    <button className="dashboard-btn-secondary" type="button">Cargar</button>
                  </form>
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Precio</th>
                        <th>Variacion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>11 Mar</td>
                        <td>$67,500</td>
                        <td className="is-positive">+2.48%</td>
                      </tr>
                      <tr>
                        <td>10 Mar</td>
                        <td>$66,820</td>
                        <td className="is-positive">+1.12%</td>
                      </tr>
                      <tr>
                        <td>09 Mar</td>
                        <td>$65,940</td>
                        <td className="is-negative">-0.84%</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>

              <Card title="Resumen operativo">
                <div className="summary-grid">
                  <div className="summary-item">
                    <span>Soporte</span>
                    <strong>$65,800</strong>
                  </div>
                  <div className="summary-item">
                    <span>Resistencia</span>
                    <strong>$68,500</strong>
                  </div>
                  <div className="summary-item">
                    <span>Dominancia BTC</span>
                    <strong>52.4%</strong>
                  </div>
                  <div className="summary-item">
                    <span>Sentimiento</span>
                    <strong>Optimista</strong>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <footer className="dashboard-footer">
            <span className="dashboard-footer-text">Panel responsive con estructura limpia, pensado para escritorio y movil.</span>
          </footer>
        </main>
      </div>
    </Layout>
  );
}

export default App
