import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';

export interface AppUser {
  id: number;
  nombre: string;
  email: string;
  preferencias: {
    monedaFavorita: string;
    categoriasSeguidas: string[];
  };
}

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface PaymentSummary {
  moneda: 'USD' | 'COP';
  metodo: 'Tarjeta' | 'Transferencia' | 'Cripto';
  confirmado: boolean;
}

export interface ShoppingCartState {
  items: CartItem[];
  pagado: boolean;
  pago: PaymentSummary;
}

export interface CommunityPost {
  id: number;
  contenido: string;
  autor: {
    id: number;
    nombre: string;
    reputacion: 'Nueva' | 'Activa' | 'Top';
  };
  tags: string[];
  fecha: string;
}

export interface TaskItem {
  id: number;
  texto: string;
  categoria: string;
  completed: boolean;
  createdAt: string;
}

export interface PriceStat {
  label: string;
  value: string;
}

export interface DashboardOutletContext {
  moneda: string;
  setMoneda: Dispatch<SetStateAction<string>>;
  publicaciones: CommunityPost[];
  setPublicaciones: Dispatch<SetStateAction<CommunityPost[]>>;
  stats: PriceStat[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  user: User | null;
  onLogout: () => void;
}

export type TaskDraft = Omit<TaskItem, 'id' | 'completed' | 'createdAt'>;