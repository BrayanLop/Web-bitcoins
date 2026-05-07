import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import '../App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import type { CartItem, CommunityPost, DashboardOutletContext, PriceStat, Product } from '../types';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../data/dataContext';

const initialStats: PriceStat[] = [
  { label: 'Precio Actual', value: '$67,500' },
  { label: 'Volumen 24h', value: '1.2B USD' },
  { label: 'ATH', value: '$69,000' },
  { label: 'Min 24h', value: '$66,000' },
  { label: 'Max 24h', value: '$68,200' },
];

const initialPosts: CommunityPost[] = [
  {
    id: 1,
    contenido: 'Bitcoin mantiene estructura alcista por encima del soporte semanal.',
    autor: {
      id: 101,
      nombre: 'Laura',
      reputacion: 'Top',
    },
    tags: ['BTC', 'Analisis'],
    fecha: '2026-04-09',
  },
  {
    id: 2,
    contenido: 'Ethereum muestra volumen creciente antes de la apertura americana.',
    autor: {
      id: 102,
      nombre: 'Mateo',
      reputacion: 'Activa',
    },
    tags: ['ETH', 'Volumen'],
    fecha: '2026-04-09',
  },
];

function LayoutBase() {
  const navigate = useNavigate();
  const [moneda, setMoneda] = useState<string>('BTC');
  const [publicaciones, setPublicaciones] = useState<CommunityPost[]>(initialPosts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from('profiles').select('avatar_url').eq('id', data.user.id).single()
          .then(({ data: profile }) => { if (profile?.avatar_url) setAvatarUrl(profile.avatar_url); });
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from('profiles').select('avatar_url').eq('id', session.user.id).single()
          .then(({ data: profile }) => { setAvatarUrl(profile?.avatar_url ?? null); });
      } else {
        setAvatarUrl(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [])

  async function onLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) => (
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ));
      }

      return [
        ...currentItems,
        {
          id: product.id,
          nombre: product.title,
          precio: product.price,
          cantidad: 1,
        },
      ];
    });
  }

  function removeFromCart(productId: number) {
    setCartItems((currentItems) => currentItems.flatMap((item) => {
      if (item.id !== productId) {
        return item;
      }

      if (item.cantidad === 1) {
        return [];
      }

      return { ...item, cantidad: item.cantidad - 1 };
    }));
  }

  function clearCart() {
    setCartItems([]);
  }

  const outletContext: DashboardOutletContext = {
    moneda,
    setMoneda,
    publicaciones,
    setPublicaciones,
    stats: initialStats,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    user,
    onLogout,
  };

  return (
    <>
      <Navbar user={user} avatarUrl={avatarUrl} onLogout={onLogout} cartCount={cartItems.reduce((s, i) => s + i.cantidad, 0)} />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet context={outletContext} />
        </main>
      </div>
    </>
  );
}

export { LayoutBase };
