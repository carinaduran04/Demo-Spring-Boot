'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PersonForm from '@/components/persona';
import ModalWrapper from '@/components/ModalWrapper';

export  interface PersonData {
  id?: number; 
  nombre?: string;
  apellidos?: string;
  cedula?: string;
  celular?: string;
  ciudad?: string;
  cuenta?: string;
  email?: string;
  telefono?: string;
  tipoConsulta?: string;
  direccion?: string;
  fechaConsulta?: string;
  comentario?: string;
  activo?: boolean;
}

export default function PersonaDetalle() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    async function fetchPerson() {
      try {
        const res = await fetch('/api/appointmentdetail/all');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const allPersons = await res.json();

        const persona = allPersons.find((p: any) => p.appointmentDtlId === Number(id));
        console.log(persona)

        if (persona) {  console.log(persona);
          setData({
            id: Number(id),
            nombre: persona.firstName,
            apellidos: persona.lastName,
            cedula: persona.cedula || '',
            celular: persona.celular || '',
            ciudad: persona.appointmentAddress?.city || '',
            cuenta: persona.noCuenta || '',
            email: persona.email || '',
            telefono: persona.phone,
            tipoConsulta: persona.consultingType || '',
            fechaConsulta: persona.consultingDate || '',
            direccion: persona.appointmentAddress?.address || '',
            comentario: persona.comment , 
            activo: persona.status === "ACTIVE",
          } as PersonData);
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
    <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <PersonForm data={data} />
    </ModalWrapper>
  );
}
