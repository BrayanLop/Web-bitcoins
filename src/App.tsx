
import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useOutletContext } from 'react-router-dom';
import { LayoutBase } from './components/LayoutBase';
import { Inicio } from './components/Inicio';
import { Precio } from './components/Precio';
import { Historial } from './components/Historial';
import { Comunidad } from './components/Comunidad';
import { ToDo } from './components/ToDo';
import { Semaforo } from './components/Semaforo';
import { Productos } from './components/Productos';
import ShoppingCart from './components/ShoppingCart';
import { ProductDetail } from './components/ProductDetail';
import type { DashboardOutletContext } from './types';

// Simulación de autenticación
const isLogged = false; // Cambia a true para probar acceso a /cart

function ProtectedRoute({ children }: { children: ReactNode }) {
  return isLogged ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Inicio />} />
          <Route path="precio" element={<PrecioWrapper />} />
          <Route path="historial" element={<HistorialWrapper />} />
          <Route path="comentarios" element={<ComunidadWrapper />} />
          <Route path="tareas" element={<ToDoWrapper />} />
          <Route path="semaforo" element={<SemaforoWrapper />} />
          <Route path="productos" element={<ProductosWrapper />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={
            <ProtectedRoute>
              <ShoppingCartWrapper />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


// Wrappers para pasar context a los componentes de sección
function PrecioWrapper() {
  const { stats } = useOutletContext<DashboardOutletContext>();
  return <Precio stats={stats} />;
}

function HistorialWrapper() {
  const { moneda, setMoneda } = useOutletContext<DashboardOutletContext>();
  return <Historial moneda={moneda} setMoneda={setMoneda} />;
}

function ComunidadWrapper() {
  const { publicaciones } = useOutletContext<DashboardOutletContext>();
  return <Comunidad publicaciones={publicaciones} />;
}

function ToDoWrapper() {
  return <ToDo />;
}

function SemaforoWrapper() {
  return <Semaforo />;
}

function ShoppingCartWrapper() {
  return <ShoppingCart />;
}

function ProductosWrapper() {
  return <Productos />;
}

export default App;
