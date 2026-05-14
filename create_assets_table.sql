-- SQL para crear la tabla de assets en Supabase
-- Ejecuta este código en el editor SQL de Supabase

CREATE TABLE IF NOT EXISTS public.assets (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_assets_created_at ON public.assets(created_at DESC);

-- Habilitar RLS (Row Level Security) si es necesario
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Crear políticas de acceso (si tienes autenticación)
-- Permitir que los usuarios vean todos los assets
CREATE POLICY "Enable read access for all users" ON public.assets
  FOR SELECT USING (true);

-- Permitir que los usuarios creen assets
CREATE POLICY "Enable insert for all users" ON public.assets
  FOR INSERT WITH CHECK (true);

-- Permitir que los usuarios actualicen sus propios assets
CREATE POLICY "Enable update for all users" ON public.assets
  FOR UPDATE USING (true);

-- Permitir que los usuarios eliminen sus propios assets
CREATE POLICY "Enable delete for all users" ON public.assets
  FOR DELETE USING (true);
