"use client";

import { useState } from "react";
import ScaleIn from "./scaleIn";

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
  direccion?: string;
  tipoConsulta?: string;
  fechaConsulta?: string;
  doctorNombre?: string;
  doctorApellidos?: string;
  doctorClinica?: string;
  doctorCiudad?: string;
  doctorTelefono?: string;
  doctorEmail?: string;
  mensaje?: string;
  especialidad?: string;
}

interface Props {
  data?: PersonData;
}

export default function PersonForm({ data }: Props) {
  //manipular cuales se pueden ver
  const visibleTabs = [  "consulta"]; 
  // "persona", "contactos", "doctor", "mensaje", 
  const [activeTab, setActiveTab] = useState<string>(visibleTabs[0]);

  const [form, setForm] = useState<PersonData>({
    nombre: data?.nombre || "",
    apellidos: data?.apellidos || "",
    apodo: data?.apodo || "",
    cedula: data?.cedula || "",
    estadoCivil: data?.estadoCivil || "",
    profesion: data?.profesion || "",
    ciudad: data?.ciudad || "",
    telefono: data?.telefono || "",
    celular: data?.celular || "",
    email: data?.email || "",
    direccion: data?.direccion || "",
    tipoConsulta: data?.tipoConsulta || "",
    fechaConsulta: data?.fechaConsulta || "",
    doctorNombre: data?.doctorNombre || "",
    doctorApellidos: data?.doctorApellidos || "",
    doctorClinica: data?.doctorClinica || "",
    doctorCiudad: data?.doctorCiudad || "",
    doctorTelefono: data?.doctorTelefono || "",
    doctorEmail: data?.doctorEmail || "",
    mensaje: data?.mensaje || "",
    especialidad: data?.especialidad || "",
  });

  const handleChange = (field: keyof PersonData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <ScaleIn>
      <div className="max-w-6xl mx-auto p-6 bg-white border-2 border-green-600 rounded-xl shadow">
        <div className="flex gap-4 border-b pb-2 mb-4 text-sm font-bold">
          {visibleTabs.includes("persona") && (
            <button
              type="button"
              onClick={() => setActiveTab("persona")}
              className={activeTab === "persona" ? "text-green-700" : "text-black-500"}
            >
              Persona
            </button>
          )}
          {visibleTabs.includes("contactos") && (
            <button
              type="button"
              onClick={() => setActiveTab("contactos")}
              className={activeTab === "contactos" ? "text-green-700" : "text-black-500"}
            >
              Contactos
            </button>
          )}
          {visibleTabs.includes("doctor") && (
            <button
              type="button"
              onClick={() => setActiveTab("doctor")}
              className={activeTab === "doctor" ? "text-green-700" : "text-black-500"}
            >
              Doctor
            </button>
          )}
          {visibleTabs.includes("mensaje") && (
            <button
              type="button"
              onClick={() => setActiveTab("mensaje")}
              className={activeTab === "mensaje" ? "text-green-700" : "text-black-500"}
            >
              Mensaje
            </button>
          )}
          {visibleTabs.includes("consulta") && (
            <button
              type="button"
              onClick={() => setActiveTab("consulta")}
              className={activeTab === "consulta" ? "text-green-700" : "text-black-500"}
            >
              Consulta
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4">
          {activeTab === "persona" && (
            <div className="col-span-12 border rounded-lg p-4 bg-gray-50">
              <h2 className="text-sm font-bold mb-3 border-b pb-1">Información Personal</h2>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Nombre</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    value={form.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Apellidos</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    value={form.apellidos}
                    onChange={(e) => handleChange("apellidos", e.target.value)}
                    readOnly
                  />
                </div>
             </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Apodo</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Mari"
                    value={form.apodo}
                    onChange={(e) => handleChange('apodo', e.target.value)} 
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Cédula:</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="043-042-99240-1"
                    value={form.cedula}
                    onChange={(e) => handleChange('cedula', e.target.value)} 
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Estado Civil:</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Casado/a"
                    value={form.estadoCivil}
                    onChange={(e) => handleChange('estadoCivil', e.target.value)} 
                    readOnly
                  />
                </div>
              </div>
          )}



          {activeTab === "contactos" && (
            <div className="col-span-12 border rounded-lg p-4 bg-gray-50">
              <h2 className="text-sm font-bold mb-3 border-b pb-1">Información de Contacto</h2>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Teléfono</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    value={form.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Celular</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    value={form.celular}
                    onChange={(e) => handleChange("celular", e.target.value)}
                    readOnly
                  />
                </div>
                 </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Correo</label>
                  <input
                    type="email"
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="ejemplo@email.com"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)} 
                    readOnly
                  />
                </div>
                <div className="col-span-6">
                  <label className="block text-[11px] font-bold">Dirección</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Av. Duarte #123, Sto. Dgo."
                    value={form.direccion}
                    onChange={(e) => handleChange('direccion', e.target.value)} 
                    readOnly
                  />
                </div>

              </div>
         
          )}

          {activeTab === "doctor" && (
            <div className="col-span-12 border rounded-lg p-4 bg-gray-50">
              <h2 className="text-sm font-bold mb-3 border-b pb-1">Información del Doctor</h2>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Nombre</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    value={form.doctorNombre}
                    onChange={(e) => handleChange("doctorNombre", e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Apellido</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    value={form.doctorApellidos}
                    onChange={(e) => handleChange("doctorApellidos", e.target.value)}
                    readOnly
                  />
                </div>
                  </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Centro de Salud</label>
                  <input
                    type="email"
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="San Jose"
                    value={form.doctorClinica}
                    onChange={(e) => handleChange('doctorClinica', e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Ciudad</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="479349242"
                    value={form.doctorCiudad}
                    onChange={(e) => handleChange('doctorCiudad', e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Telefono</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="8095762352"
                    value={form.doctorTelefono}
                    onChange={(e) => handleChange('doctorTelefono', e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Correo</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="manuel234@gmail.com"
                    value={form.doctorEmail}
                    onChange={(e) => handleChange('doctorEmail', e.target.value)}
                    readOnly
                  />
                </div>
                  <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Especialidad</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="pedriatria"
                    value={form.especialidad}
                    onChange={(e) => handleChange('especialidad', e.target.value)}
                    readOnly
                  />
                </div>

              </div>
          )}

         {activeTab === 'mensaje' && (
            <div className="col-span-12 border rounded-lg p-4 bg-gray-50">
              <h2 className="text-sm font-bold mb-3 border-b pb-1">Mensaje</h2>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Nombre del paciente </label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="juan"
                    value={form.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Apellido del paciente</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Alquilada"
                    value={form.apellidos}
                    onChange={(e) => handleChange('apellidos', e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Nombre del Doctor</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Bonao"
                    value={form.doctorNombre}
                    onChange={(e) => handleChange('doctorNombre', e.target.value)}
                    readOnly
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold">Apellido del Doctor</label>
                  <input
                    className="w-full border border-green-600 rounded p-1.5 text-xs"
                    placeholder="Almontte"
                    value={form.doctorApellidos}
                    onChange={(e) => handleChange('doctorApellidos', e.target.value)}
                    readOnly
                  />
                </div>

                <div className="col-span-12 mt-4">
                  <label className="block text-[11px] font-bold mb-2">Mensaje recibido</label>
                  <textarea
                    className="w-full border border-green-600 rounded p-3 text-xs bg-gray-100 min-h-[120px] resize-none"
                    value={form.mensaje || 'No hay mensaje disponible'}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
          
          
          {activeTab === 'consulta' && (
          <div className="col-span-12 border rounded-lg p-4 bg-gray-50">
            <h2 className="text-sm font-bold mb-3 border-b pb-1">Consulta</h2>
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-3">
                <label className="block text-[11px] font-bold">Nombre</label>
                <input
                  className="w-full border border-green-600 rounded p-1.5 text-xs"
                  value={form.nombre}
                  readOnly
                />
              </div>
              <div className="col-span-3">
                <label className="block text-[11px] font-bold">Apellido</label>
                <input
                  className="w-full border border-green-600 rounded p-1.5 text-xs"
                  value={form.apellidos}
                  readOnly
                />
              </div>
              <div className="col-span-3">
                <label className="block text-[11px] font-bold">Correo</label>
                <input
                  type="email"
                  className="w-full border border-green-600 rounded p-1.5 text-xs"
                  value={form.email}
                  readOnly
                />
              </div>
              <div className="col-span-3">
                <label className="block text-[11px] font-bold">Teléfono</label>
                <input
                  className="w-full border border-green-600 rounded p-1.5 text-xs"
                  value={form.telefono}
                  readOnly
                />
              </div>
              <div className="col-span-6">
                <label className="block text-[11px] font-bold">Tipo de consulta</label>
                <input
                  className="w-full border border-green-600 rounded p-1.5 text-xs"
                  value={form.tipoConsulta}
                  readOnly
                />
              </div>
                <div className="col-span-6">
                <label className="block text-[11px] font-bold">Fecha de la consulta</label>
                <input
                  className="w-full border border-green-600 rounded p-1.5 text-xs"
                  value={form.fechaConsulta}
                  readOnly
                />
              </div>
              <div className="col-span-12 mt-4">
                  <label className="block text-[11px] font-bold mb-2">Mensaje recibido</label>
                  <textarea
                    className="w-full border border-green-600 rounded p-3 text-xs bg-gray-100 min-h-[120px] resize-none"
                    value={form.mensaje || 'No hay mensaje disponible'}
                    readOnly
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
