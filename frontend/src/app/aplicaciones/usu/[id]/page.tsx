"use client";

import { useParams } from "next/navigation";
import UsuarioVerMas from "@/components/UsuarioVerMas";

export default function UsuarioPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : 0;

  if (!id) {
    return (
      <div className="text-center text-red-600 p-10 font-semibold">
        No se encontró un ID de usuario válido.
      </div>
    );
  }

  return <UsuarioVerMas id={id} />;
}
