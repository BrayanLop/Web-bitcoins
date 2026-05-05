import { useState } from 'react';
import './NexusCrypto.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '../schemas/UserValidator';


interface Movement {
  id: number;
  type: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

export function NexusCrypto() {
  const [monto, setMonto] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [movimientos, setMovimientos] = useState<Movement[]>([]);

 const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      points: 0,
      operacion: 'comprar'
    }
  });

  const onSubmit = (data: any) => {
    const montoNum = parseFloat(monto);
    if (!monto || isNaN(montoNum) || montoNum <= 0) return;
    
    const btcAmount = montoNum / precioActualBTC;
    const nuevaFecha = new Date().toLocaleString('es-CO');
    const nuevo: Movement = {
      id: Date.now(),
      type: data.operacion === 'comprar' ? 'Orden de Comprar' : 'Orden de Vender',
      date: nuevaFecha,
      amount: `${data.operacion === 'comprar' ? '+' : '-'}${btcAmount.toFixed(8)} BTC`,
      isPositive: data.operacion === 'comprar',
    };
    setMovimientos(prev => [nuevo, ...prev]);
    setMonto('');
    reset();
  };

  const precioActualBTC = 85000;
  const btcBalance = movimientos
    .reduce((acc, m) => {
      const val = parseFloat(m.amount.replace('+', '').replace('-', '').replace(' BTC', ''));
      return m.isPositive ? acc + val : acc - val;
    }, 0);
  const usdValue = Math.round(btcBalance * precioActualBTC);

  const filtrados = movimientos.filter(m =>
    m.type.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="nexus-section">
      <div className="nexus-grid">
          <div className="nexus-left">
            <div className="nexus-balance-card">
              <span className="nexus-balance-label">Saldo en Bitcoin</span>
              <div className="nexus-balance-amount">{btcBalance.toFixed(8)}</div>
              <div className="nexus-balance-btc">BTC</div>
              <div className="nexus-balance-usd"> = ${usdValue.toLocaleString()} USD | Coin: ${precioActualBTC.toLocaleString()}
              </div>
            </div>

            <div className="nexus-form-card">
              <h3 className="nexus-form-title">Operar mercato</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="nexus-form-group">
                <label>Inversión (USD)</label>
                <input
                  type="number"
                  placeholder="Monto en Dólares"
                  value={monto}
                  onChange={e => setMonto(e.target.value)}
                  min="0"
                  required
                />
              </div>

          <div className="nexus-form-group">
                <label>Precio actual BTC</label>
                <input
                  type="text"
                  value={`$${precioActualBTC.toLocaleString()}`}
                  readOnly
                />
              </div>

              <div className="nexus-form-group">
                <label>Operación</label>
                <select {...register("operacion" as any)}>
                  <option value="comprar">Comprar</option>
                  <option value="vender">Vender</option>
                </select>
              </div>

              <button type="submit" className="nexus-btn-ejecutar">
                Ejecutar
              </button>
              </form>
            </div>
          </div>

          <div className="nexus-right">
            <div className="nexus-historial-header">
              <h2 className="nexus-historial-title">Historial de Movimientos</h2>
              <div className="nexus-historial-controls">
                <input
                  type="text"
                  placeholder="Buscar por categoría..."
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                />
                <button
                  className="nexus-btn-limpiar"
                  onClick={() => setMovimientos([])}
                >
                  Limpiar Historial
                </button>
              </div>
            </div>

            <div className="nexus-movements">
              {filtrados.length === 0 ? (
                <p className="nexus-empty">No hay movimientos registrados.</p>
              ) : (
                filtrados.map(m => (
                  <div key={m.id} className="nexus-movement-item">
                    <div>
                      <div className="nexus-movement-type">{m.type}</div>
                      <div className="nexus-movement-date">{m.date}</div>
                    </div>
                    <div className={`nexus-movement-amount ${m.isPositive ? 'positive' : 'negative'}`}>
                      {m.amount}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
    </section>
  );
}
