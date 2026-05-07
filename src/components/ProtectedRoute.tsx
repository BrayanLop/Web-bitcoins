import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { supabase } from '../data/dataContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', color: '#fff', fontSize: '1rem' }}>
        Cargando...
      </div>
    );
  }

  if (!authenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
