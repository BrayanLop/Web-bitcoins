import { useState } from 'react'
 
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

  export function TarjetaUsuario({ usuario, esPremium,onActivar }: PropsTarjeta) {
    const [editando, setEditando] = useState(false);
    const [apodo, setapodo] = useState("");
  }
