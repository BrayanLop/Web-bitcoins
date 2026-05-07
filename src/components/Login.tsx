import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../data/dataContext';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [status, setStatus] = useState<null | 'loading' | 'error'>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
      navigate('/');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message ?? 'Error al autenticar');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem 2rem', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>₿</div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', margin: '0 0 0.25rem', fontWeight: 700 }}>CryptoRat</h1>
          <p style={{ color: '#8ea4c8', fontSize: '0.85rem', margin: 0 }}>
            {mode === 'login' ? 'Inicia sesión en tu cuenta' : 'Crea una cuenta nueva'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ea4c8', marginBottom: '0.4rem' }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(6,14,27,0.7)', color: '#eef4ff', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ea4c8', marginBottom: '0.4rem' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(6,14,27,0.7)', color: '#eef4ff', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          {status === 'error' && (
            <p style={{ color: '#e74c3c', fontSize: '0.82rem', margin: 0, padding: '0.5rem 0.75rem', background: 'rgba(231,76,60,0.1)', borderRadius: '8px', border: '1px solid rgba(231,76,60,0.3)' }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ padding: '0.75rem', borderRadius: '10px', border: 'none', background: '#4f6ef7', color: '#fff', fontWeight: 600, fontSize: '0.95rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1, marginTop: '0.5rem' }}
          >
            {status === 'loading' ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#8ea4c8' }}>
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setStatus(null); setErrorMsg(''); }}
            style={{ background: 'none', border: 'none', color: '#4f6ef7', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0 }}
          >
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
