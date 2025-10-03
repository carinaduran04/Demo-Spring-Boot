"use client";

import { useState, useEffect } from "react";
import ScaleIn from "./scaleIn";
import { useRouter } from "next/navigation";

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
  fechaConsulta: Date;
  doctorNombre?: string;
  doctorApellidos?: string;
  doctorClinica?: string;
  doctorCiudad?: string;
  doctorTelefono?: string;
  doctorEmail?: string;
  mensaje?: string;
  especialidad?: string;
    activo?: boolean; 
}

interface Props {
  data: PersonData;
}

export default function PersonForm({ data }: Props) {
    const router = useRouter();
  const visibleTabs = [ "consulta"];
  //"persona", "contactos", "doctor", "mensaje", "consulta"
  const [activeTab, setActiveTab] = useState<string>(visibleTabs[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    direccion: data?.direccion|| "",
    tipoConsulta: data?.tipoConsulta || "",

    fechaConsulta: data.fechaConsulta || "",
    doctorNombre: data?.doctorNombre || "",
    doctorApellidos: data?.doctorApellidos || "",
    doctorClinica: data?.doctorClinica || "",
    doctorCiudad: data?.doctorCiudad || "",
    doctorTelefono: data?.doctorTelefono || "",
    doctorEmail: data?.doctorEmail || "",
    mensaje: data?.mensaje || "",
    especialidad: data?.especialidad || "",
     activo: data?.activo !== false,
  });

  const [originalData, setOriginalData] = useState(form);

  
  useEffect(() => {
    if (!isEditing) return;
    const isEqual = JSON.stringify(form) === JSON.stringify(originalData);
    setHasChanges(!isEqual);
  }, [form, originalData, isEditing]);

  const handleChange = (field: keyof PersonData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Datos guardados correctamente");
    setOriginalData(form);
    setIsEditing(false);
    setHasChanges(false);
  };

  const onCancel = () => {
    setForm(originalData);
    setIsEditing(false);
    setHasChanges(false);
  };

    // solo marca como inactivo
  const handleDelete = () => {
    setForm((prev) => ({ ...prev, activo: false }));
    alert("Registro eliminado correctamente");
    router.push("/aplicaciones/consulta");
  };
  return (
    <ScaleIn>
     <div className=" my-auto">
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 border-2 border-green-600 rounded-xl shadow m-10">
      <div className="flex gap-6 border-b pb-2 mb-2 text-lg font-bold text-gray-700">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-0 ${
              activeTab === tab
               ? "text-green-700 "
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
   
      <div className="flex justify-end gap-2 mb-4">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </button>

                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Eliminar
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700"
                      onClick={handleDelete}
                    >
                      Confirmar eliminar
                    </button>

                    <button
                      type="button"
                      className="bg-gray-400 text-white px-4 py-2 text-sm rounded hover:bg-gray-500"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {hasChanges && (
                  <button
                    type="submit"
                    form="personForm"
                    className="bg-green-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700"
                  >
                    Guardar
                  </button>
                )}
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-400 text-white px-4 py-2 text-sm rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>

      <form
        id="personForm"
        onSubmit={onSubmit}
        className="grid grid-cols-12 gap-6"
      >
        {/* Persona */}
        {activeTab === "persona" && (
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">
              Información Personal
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <InputField
                label="Nombre"
                value={form.nombre}
                readOnly={!isEditing}
                onChange={(v) => handleChange("nombre", v)}
              />
              <InputField
                label="Apellidos"
                value={form.apellidos}
                readOnly={!isEditing}
                onChange={(v) => handleChange("apellidos", v)}
              />
              <InputField
                label="Apodo"
                value={form.apodo}
                readOnly={!isEditing}
                onChange={(v) => handleChange("apodo", v)}
              />
              <InputField
                label="Cédula"
                value={form.cedula}
                readOnly={!isEditing}
                onChange={(v) => handleChange("cedula", v)}
              />
              <InputField
                label="Estado Civil"
                value={form.estadoCivil}
                readOnly={!isEditing}
                onChange={(v) => handleChange("estadoCivil", v)}
              />
              <InputField
                label="Profesión"
                value={form.profesion}
                readOnly={!isEditing}
                onChange={(v) => handleChange("profesion", v)}
              />
            </div>
          </div>
        )}

        {/* Contactos */}
        {activeTab === "contactos" && (
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">
              Información de Contacto
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <InputField
                label="Teléfono"
                value={form.telefono}
                readOnly={!isEditing}
                onChange={(v) => handleChange("telefono", v)}
              />
              <InputField
                label="Celular"
                value={form.celular}
                readOnly={!isEditing}
                onChange={(v) => handleChange("celular", v)}
              />
              <InputField
                label="Correo"
                type="email"
                value={form.email}
                readOnly={!isEditing}
                onChange={(v) => handleChange("email", v)}
              />
              <InputField
                label="Dirección"
                value={form.direccion}
                readOnly={!isEditing}
                className="col-span-6"
                onChange={(v) => handleChange("direccion", v)}
              />
            </div>
          </div>
        )}

        {/* Doctor */}
        {activeTab === "doctor" && (
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">
              Información del Doctor
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <InputField
                label="Nombre"
                value={form.doctorNombre}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorNombre", v)}
              />
              <InputField
                label="Apellidos"
                value={form.doctorApellidos}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorApellidos", v)}
              />
              <InputField
                label="Centro de Salud"
                value={form.doctorClinica}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorClinica", v)}
              />
              <InputField
                label="Ciudad"
                value={form.doctorCiudad}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorCiudad", v)}
              />
              <InputField
                label="Teléfono"
                value={form.doctorTelefono}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorTelefono", v)}
              />
              <InputField
                label="Correo"
                type="email"
                value={form.doctorEmail}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorEmail", v)}
              />
              <InputField
                label="Especialidad"
                value={form.especialidad}
                readOnly={!isEditing}
                onChange={(v) => handleChange("especialidad", v)}
              />
            </div>
          </div>
        )}

        {/* Mensaje */}
        {activeTab === "mensaje" && (
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">Mensaje</h2>
            <div className="grid grid-cols-6 gap-4">
              <InputField
                label="Nombre del paciente"
                value={form.nombre}
                readOnly={!isEditing}
                onChange={(v) => handleChange("nombre", v)}
              />
              <InputField
                label="Apellido del paciente"
                value={form.apellidos}
                readOnly={!isEditing}
                onChange={(v) => handleChange("apellidos", v)}
              />
              <InputField
                label="Nombre del Doctor"
                value={form.doctorNombre}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorNombre", v)}
              />
              <InputField
                label="Apellido del Doctor"
                value={form.doctorApellidos}
                readOnly={!isEditing}
                onChange={(v) => handleChange("doctorApellidos", v)}
              />
              <TextAreaField
                label="Mensaje recibido"
                value={form.mensaje || ""}
                readOnly={!isEditing}
                className="col-span-12"
                onChange={(v) => handleChange("mensaje", v)}
              />
            </div>
          </div>
        )}

        {/* Consulta */}
        {activeTab === "consulta" && (
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">Consultas</h2>
            <div className="grid grid-cols-8 gap-4">
              <InputField
                label="Nombre"
                value={form.nombre}
                readOnly={!isEditing}
                className="col-span-3"
                onChange={(v) => handleChange("nombre", v)}
              />
              <InputField
                label="Apellido"
                value={form.apellidos}
                readOnly={!isEditing}
                className="col-span-3"
                onChange={(v) => handleChange("apellidos", v)}
              />
              <InputField
                label="Correo"
                type="email"
                value={form.email}
                readOnly={!isEditing}
                className="col-span-3"
                onChange={(v) => handleChange("email", v)}
              />
              <InputField
                label="Teléfono"
                value={form.telefono}
                readOnly={!isEditing}
                className="col-span-3"
                onChange={(v) => handleChange("telefono", v)}
              />
              <InputField
                label="Tipo de consulta"
                value={form.tipoConsulta}
                readOnly={!isEditing}
                className="col-span-3"
                onChange={(v) => handleChange("tipoConsulta", v)}
              />
               <InputField
                label="Direccion"
                value={form.direccion}
                readOnly={!isEditing}
                className="col-span-4"
                onChange={(v) => handleChange("direccion", v)}
              />
              <InputField
                label="Fecha de la consulta"
                value={form.fechaConsulta.toLocaleString("es-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                     
                    })}
                readOnly={!isEditing}
                className="col-span-5"
                onChange={(v) => handleChange("fechaConsulta", v)}
              />

              <TextAreaField
                label="Mensaje recibido"
                value={form.mensaje || ""}
                readOnly={!isEditing}
                className="col-span-12"
                onChange={(v) => handleChange("mensaje", v)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
    </div> 
    </ScaleIn>
  );
}

          function InputField({
            label,
            value,
            onChange,
            readOnly,
            type = "text",
            className = "col-span-3",
          }: {
            label: string;
            value?: string;
            onChange: (val: string) => void;
            readOnly: boolean;
            type?: string;
            className?: string;
          }) {
            return (
              <div className={className}>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  className={`w-full border border-green-600 rounded p-2 text-sm ${
                    readOnly ? "bg-gray-100" : "bg-white"
                  }`}
                  value={value || ""}
                  readOnly={readOnly}
                  onChange={(e) => onChange(e.target.value)}
                />
              </div>
            );
          }

          function TextAreaField({
            label,
            value,
            onChange,
            readOnly,
            className = "col-span-6",
          }: {
            label: string;
            value?: string;
            onChange: (val: string) => void;
            readOnly: boolean;
            className?: string;
          }) {
            return (
              <div className={className}>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  {label}
                </label>
                <textarea
                  className={`w-full border border-green-600 rounded p-2 text-sm min-h-[100px] resize-none ${
                    readOnly ? "bg-gray-100" : "bg-white"
                  }`}
                  value={value || ""}
                  readOnly={readOnly}
                  onChange={(e) => onChange(e.target.value)}
                />
              </div>
          );
        }
