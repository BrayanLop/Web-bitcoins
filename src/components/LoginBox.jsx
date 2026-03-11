import React, { useState } from 'react';

export function LoginBox({ onLogin }) {
  const [user, setUser] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (user.trim() !== '') {
      onLogin(user);
      setUser('');
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 8px rgba(30,60,114,0.08)', maxWidth: 320, margin: '0 auto' }}>
      <label style={{ color: '#232526', fontWeight: 600 }}>Usuario:</label>
      <input value={user} onChange={e => setUser(e.target.value)} placeholder="Ingresa tu usuario" style={{ borderRadius: 8, padding: 10, border: '1.5px solid #bdbdbd', background: '#f7f7fa', color: '#232526' }} />
      <button type="submit" style={{ background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)', color: '#232526', border: 'none', borderRadius: 8, padding: '10px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Entrar</button>
    </form>
  );
}
