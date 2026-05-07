
import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import { LayoutBase } from './components/LayoutBase';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Inicio } from './components/Inicio';
import { Precio } from './components/Precio';
import { Historial } from './components/Historial';
import { Comunidad } from './components/Comunidad';
import { ToDo } from './components/ToDo';
import { Productos } from './components/Productos';
import ShoppingCart from './components/ShoppingCart';
import { ProductDetail } from './components/ProductDetail';
import { NexusCrypto } from './components/NexusCrypto';
import { Perfil } from './components/Perfil';
import type { DashboardOutletContext } from './types';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LayoutBase />
            </ProtectedRoute>
          }
        >
          <Route index element={<Inicio />} />
          <Route path="mercado" element={<PrecioWrapper />} />
          <Route path="historial" element={<HistorialWrapper />} />
          <Route path="comunidad" element={<Comunidad />} />
          <Route path="tareas" element={<ToDo />} />
          <Route path="tienda" element={<ProductosWrapper />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="operaciones" element={<NexusCrypto />} />
          <Route path="carrito" element={<ShoppingCartWrapper />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PrecioWrapper() {
  const { stats } = useOutletContext<DashboardOutletContext>();
  return <Precio stats={stats} />;
}

function HistorialWrapper() {
  const { moneda, setMoneda } = useOutletContext<DashboardOutletContext>();
  return <Historial moneda={moneda} setMoneda={setMoneda} />;
}

function ShoppingCartWrapper() {
  return <ShoppingCart />;
}

function ProductosWrapper() {
  return <Productos />;
}

export default App;
