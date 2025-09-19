'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PersonForm from '@/components/persona';

interface PersonData {
  nombre?: string;
  apellidos?: string;
  cedula?: string;
  celular?: string;
  ciudad?: string;
  cuenta?: string;
  email?: string;
  telefono?: string;
  // agrega otros campos si los necesitas
}

export default function PersonaDetalle() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPerson() {
      try {
        const res = await fetch('/api/appointment/all'); // Trae todos los registros
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const allPersons = await res.json();

        const persona = allPersons.find((p: any) => p.id === Number(id)); // Filtra por id

        if (persona) {
          // Mapea los campos de la API al formulario
          setData({
            nombre: persona.firstName,
            apellidos: persona.lastName,
            cedula: persona.cedula,
            celular: persona.celular,
            ciudad: persona.ciudad,
            cuenta: persona.noCuenta,
            email: persona.email,
            telefono: persona.phone,
          });
        } else {
          setData(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchPerson();
  }, [id]);

  if (loading) return <div className="mt-20 p-4 text-center">Cargando...</div>;
  if (error) return <div className="mt-20 p-4 text-center text-red-500">{error}</div>;
  if (!data) return <div className="mt-20 p-4 text-center">No se encontró la persona</div>;

  return (
    <div className="mt-20 p-4">
      <PersonForm data={data} />
    </div>
  );
}
