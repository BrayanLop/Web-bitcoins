import React from 'react';
import { Card } from './Card';

export function Historial({ moneda, setMoneda }) {
  return (
    <section id="historial">
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
    </section>
  );
}
