'use client';

import { useState, useEffect } from 'react';
import Tabs from './tabs';
import ScaleIn from './scaleIn';

interface PersonData {
  nombre?: string;
  apellidos?: string;
  apodo?: string;
  cedula?: string;
  estadoCivil?: string;
  profesion?: string;
  ciudad?: string;
  telefono?: string;
  celular?: string;
  email?: string;
  contactoTrabajo?: string;
  contactoTelefonos?: string;
  banco?: string;
  cuenta?: string;
  vivienda?: string;
  inicioVivienda?: string;
  negocioPropio?: string;
  tiempoNegocio?: string;
  dependientes?: string;
  tipoPrestamo?: string;
  monto?: string;
}

interface Props {
  data?: PersonData;
}

export default function PersonForm({ data }: Props) {
  const [activeTab, setActiveTab] = useState('persona');


  const [form, setForm] = useState<PersonData>({
    nombre: data?.nombre || '',
    apellidos: data?.apellidos || '',
    apodo: data?.apodo || '',
    cedula: data?.cedula || '',
    estadoCivil: data?.estadoCivil || '',
    profesion: data?.profesion || '',
    ciudad: data?.ciudad || '',
    telefono: data?.telefono || '',
    celular: data?.celular || '',
    email: data?.email || '',
    contactoTrabajo: data?.contactoTrabajo || '',
    contactoTelefonos: data?.contactoTelefonos || '',
    banco: data?.banco || '',
    cuenta: data?.cuenta || '',
    vivienda: data?.vivienda || '',
    inicioVivienda: data?.inicioVivienda || '',
    negocioPropio: data?.negocioPropio || '',
    tiempoNegocio: data?.tiempoNegocio || '',
    dependientes: data?.dependientes || '',
    tipoPrestamo: data?.tipoPrestamo || '',
    monto: data?.monto || '',
  });

  const handleChange = (field: keyof PersonData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado', form);
  };

  return (
    <ScaleIn>
      <div className="max-w-6xl mx-auto p-6 bg-white border-2 border-green-600 rounded-xl shadow">
        <Tabs onTabChange={(tab) => setActiveTab(tab)} />

        <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4">
          {activeTab === 'persona' && (
            <div className="col-span-12 border rounded-lg p-4 bg-gray-50">
              <h2 className="text-sm font-bold mb-3 border-b pb-1">Nombre y Direcciones</h2>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Nombre</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Maribel"
                    value={form.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Apellidos</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Duran"
                    value={form.apellidos}
                    onChange={(e) => handleChange('apellidos', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Apodo</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Mari"
                    value={form.apodo}
                    onChange={(e) => handleChange('apodo', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Cédula:</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="043-042-99240-1"
                    value={form.cedula}
                    onChange={(e) => handleChange('cedula', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Estado Civil:</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Casado/a"
                    value={form.estadoCivil}
                    onChange={(e) => handleChange('estadoCivil', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
            
          {activeTab === 'contactos' && (
            <div className="col-span-12 border rounded-lg p-4 bg-gray-50">
              <h2 className="text-sm font-bold mb-3 border-b pb-1">Información de Contacto</h2>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Teléfono</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="+1 809-555-1234"
                    value={form.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Celular</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="+1 829-555-5678"
                    value={form.celular}
                    onChange={(e) => handleChange('celular', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Correo</label>
                  <input
                    type="email"
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="ejemplo@email.com"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="col-span-6">
                  <label className="block text-[11px] font-bold">Dirección</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Av. Duarte #123, Sto. Dgo."
                    value={form.contactoTrabajo}
                    onChange={(e) => handleChange('contactoTrabajo', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </ScaleIn>
  );
}
