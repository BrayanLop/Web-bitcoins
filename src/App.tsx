
import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
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
import { NexusCrypto } from './components/NexusCrypto';
import type { DashboardOutletContext } from './types';

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
          <Route path="nexus" element={<NexusCrypto />} />
          <Route path="cart" element={<ShoppingCartWrapper />} />
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
