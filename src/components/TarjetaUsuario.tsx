import { useState } from "react";
 
interface Usuarioinfo  {
    id: number;
    nombre: string;
    email: string;
  }
 
  interface PropsTarjeta {
    usuario: Usuarioinfo;
    esPremium: boolean;
    onActivar: () => void;
  }

export function TarjetaUsuario({ usuario, esPremium, onActivar }: PropsTarjeta) {
  const [editando, setEditando] = useState(false);
  const [apodo, setApodo] = useState("");
 
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApodo(e.target.value);
  };
 
  return (
    <div>
      <h2>{usuario.nombre}</h2>
      {esPremium ? <span> VIP</span> : <button onClick={onActivar}>Ser Premium</button>}
      <input value={apodo} onChange={manejarCambio} />
    </div>
  )
}
 