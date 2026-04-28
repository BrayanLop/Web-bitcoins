import { useEffect, useState } from 'react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { Card } from './Card';
import { supabase } from '../data/dataContext';

interface HistoryRow {
  fecha: string;
  precio: string;
  variacion: string;
}

function buildHistory(moneda: string, dias: number): HistoryRow[] {
  const normalizedCurrency = moneda.trim().toUpperCase() || 'BTC';
  const today = new Date();
  const basePrice = normalizedCurrency === 'ETH' ? 3180 : normalizedCurrency === 'SOL' ? 142 : 67500;

  return Array.from({ length: Math.min(dias, 7) }, (_, index) => {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - index);

    const variationValue = ((dias - index) * 0.37 - 1.15).toFixed(2);
    const numericPrice = basePrice + (dias - index) * 180;

    return {
      fecha: currentDate.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
      precio: `$${numericPrice.toLocaleString('en-US')}`,
      variacion: `${variationValue.startsWith('-') ? '' : '+'}${variationValue}%`,
    };
  });
}

export function Historial({
  moneda,
  setMoneda,
}: {
  moneda: string;
  setMoneda: Dispatch<SetStateAction<string>>;
}) {
  const [dias, setDias] = useState<number>(7);
  const [historial, setHistorial] = useState<HistoryRow[]>(() => buildHistory(moneda, 7));

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { data, error } = await supabase.from('transacciones').select('*');
        
        if (error) {
          console.warn('Error:', error.message);
          return;
        }
        
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('Datos cargados:', data);
          
          const datosTransformados = data.map((item: any) => ({
            fecha: item.fecha ? new Date(item.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }) : 'N/A',
            precio: item.monto ? `$${Number(item.monto).toLocaleString('en-US')}` : '$0',
            variacion: item.crypto ? `${item.crypto}` : 'N/A'
          }));
          
          setHistorial(datosTransformados);
        } else {
          console.log('No hay datos - data es null, no es array, o está vacía');
        }
      } catch (err) {
        console.error('Error en cargarDatos:', err);
      }
    };

    const timer = setTimeout(() => {
      cargarDatos();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHistorial(buildHistory(moneda, dias));
  }

  return (
    <section id="historial">
      <Card title="Historial">
        <form className="dashboard-filter-form" onSubmit={handleSubmit}>
          <label htmlFor="moneda">Moneda</label>
          <input
            id="moneda"
            value={moneda}
            onChange={(event) => setMoneda(event.target.value)}
            type="text"
            placeholder="BTC"
            className="dashboard-input"
          />
          <label htmlFor="dias">Periodo</label>
          <select
            id="dias"
            className="dashboard-input"
            value={dias}
            onChange={(event) => setDias(Number(event.target.value))}
          >
            <option value={7}>7 dias</option>
            <option value={14}>14 dias</option>
            <option value={30}>30 dias</option>
          </select>
          <button className="dashboard-btn-secondary" type="submit">Cargar</button>
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
            {historial.map((registro) => (
              <tr key={registro.fecha}>
                <td>{registro.fecha}</td>
                <td>{registro.precio}</td>
                <td className={registro.variacion.startsWith('-') ? 'is-negative' : 'is-positive'}>
                  {registro.variacion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
