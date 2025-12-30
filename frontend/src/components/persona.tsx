"use client";

import { useState, useEffect } from "react";
import ScaleIn from "./scaleIn";
import { useRouter, useParams } from "next/navigation";
import ModalAlert from "@/components/modalalert";
import { PersonData } from "@/app/aplicaciones/persona/[id]/page";

interface Props{ 
  data: PersonData
}

export default function PersonForm({ data }: Props) {
  const params = useParams();
  const idFromUrl = params?.id ? Number(params.id) : 0;
  const router = useRouter();
  const visibleTabs = ["consulta"];
  const [activeTab, setActiveTab] = useState<string>(visibleTabs[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  console.log("Datos recibidos en PersonForm:", data);

  const [form, setForm] = useState<PersonData>({
    id: data?.id || idFromUrl || 0,
    nombre: data?.nombre || "",
    apellidos: data?.apellidos || "",
    cedula: data?.cedula || "",
    ciudad: data?.ciudad || "",
    telefono: data?.telefono || "",
    celular: data?.celular || "",
    email: data?.email || "",
    direccion: data?.direccion || "",
    tipoConsulta: data?.tipoConsulta || "",
    fechaConsulta: data?.fechaConsulta || "",
    comentario: data?.comentario, 
    activo: data?.activo !== false,
  });
 

  const [originalData, setOriginalData] = useState(form);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onOkAction, setOnOkAction] = useState<(() => void) | null>(null);
  const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);
  const [user, setUser] = useState<{ username?: string; role?: string } | null>( null
  );

   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser && storedUser.username) {
      setUser(storedUser);
      console.log("Usuario cargado:", storedUser);
    }
  }, []);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isEditing) return;
    const isEqual = JSON.stringify(form) === JSON.stringify(originalData);
    setHasChanges(!isEqual);
  }, [form, originalData, isEditing]);

  const handleChange = (field: keyof PersonData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const showModalDialog = (
    message: string,
    onOkActionParam?: () => void | Promise<void>,
    onCancelActionParam?: () => void | Promise<void>
  ) => {
    setModalMessage(message);
    setOnOkAction(() => onOkActionParam || null);
    setOnCancelAction(() => onCancelActionParam || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
    setOnOkAction(null);
    setOnCancelAction(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.id) {
      showModalDialog("No se puede guardar: falta el ID del registro");
      return;
    }

    const payload = {
      firstName: (form.nombre || "").toUpperCase(),
      lastName: (form.apellidos || "").toUpperCase(),
      fullName: `${form.nombre || ""} ${form.apellidos || ""}`.toUpperCase().trim(),
      phone: (form.telefono || "").toUpperCase(),
      email: form.email || "",
      consultingType: (form.tipoConsulta || "").toUpperCase(),
      consultingDate: form.fechaConsulta
        ? new Date(form.fechaConsulta).toISOString()
        : null,
      comment: (form.comentario || "").toUpperCase(),
      status: form.activo ? "ACTIVE" : "INACTIVO",
      appointmentAddress: {
        address: (form.direccion || "").toUpperCase(),
        city: (form.ciudad || "").toUpperCase(),
      },
    };

    try {
      const response = await fetch(`/api/appointmentdetail/update/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al guardar (${response.status}): ${errorText}`);
      }

      const savedData = await response.json();
      console.log("Registro actualizado:", savedData);

      showModalDialog("Cambios guardados correctamente en la base de datos", () => {
        setOriginalData(form);
        setIsEditing(false);
        setHasChanges(false);
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      showModalDialog("Ocurrió un error al guardar los cambios");
    }
  };

  const onCancel = () => {
    if (!hasChanges) {
      setForm(originalData);
      setIsEditing(false);
      setHasChanges(false);
      return;
    }

    showModalDialog(
      "¿Seguro que deseas cancelar? Se perderán los cambios no guardados.",
      () => {
        setForm(originalData);
        setIsEditing(false);
        setHasChanges(false);
      }
    );
  };

  const handleDelete = () => {
    const idToDelete = form.id || idFromUrl;
    if (!idToDelete || idToDelete === 0) {
      showModalDialog("No se puede eliminar: falta el ID válido");
      return;
    }

    showModalDialog(
      "¿Estás seguro de que deseas eliminar esta cita?",
      async () => {
        try {
          const response = await fetch(
            `/api/appointmentdetail/delete/${idToDelete}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
          }

          console.log("Cita eliminada correctamente");
          router.push("/aplicaciones/consulta");
        } catch (error) {
          console.error("Error al eliminar:", error);
          closeModal();
          showModalDialog("Ocurrió un error al eliminar la cita");
        }
      },
      () => {
        console.log("Eliminación cancelada");
        closeModal();
      }
    );
  };

  const handleExit = () => {
    if (!hasChanges) {
      router.push("/aplicaciones/consulta");
      return;
    }
    showModalDialog(
      "¿Seguro que deseas salir? Se perderán los cambios no guardados.",
      () => {
        router.push("/aplicaciones/consulta");
      }
    );
  };

  return (
    <ScaleIn>
     <div className=" my-auto">
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 border-2 border-green-600 rounded-xl shadow m-10">
      <div className="flex gap-6 border-b pb-2 mb-4 text-lg font-bold text-gray-700">
        {visibleTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-0 ${
                  activeTab === tab ? "text-green-700" : "text-gray-500 hover:text-green-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

         <div className="flex justify-between items-center mb-4">
        
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm font-bold rounded-full ${
                    form.activo
                      ? "bg-green-100 text-green-700 border border-green-600"
                      : "bg-red-100 text-red-700 border border-red-600"
                  }`}
                >
                  {form.activo ? "ACTIVO" : "INACTIVO"}
                </span>
                  {isEditing && (
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={form.activo} onChange={(e) => handleChange("activo", e.target.checked)} className="w-4 h-4 text-green-600 border-green-500 rounded focus:ring-green-500" />
                    <label className="text-green-700 font-semibold">
                      {form.activo ? "Activo" : "Inactivo"}
                    </label>
                  </div>
                )}
              </div>
            

              <div className="flex gap-2 justify-end">
                {!isEditing ? (
                  <>
                    <button
                      type="button" className="bg-green-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-green-700" onClick={() => setIsEditing(true)}
                    >
                      EDITAR
                    </button>
                    <button
                      type="button" className="bg-red-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-red-700" onClick={handleDelete}
                    >
                      ELIMINAR
                    </button>
                 
                  </>
                ) : (
                  <>
                    {hasChanges && (
                      <button
                        type="submit" form="personForm" className="bg-green-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-green-700"
                      >
                        GUARDAR
                      </button>
                    )}
                    <button
                      type="button" onClick={onCancel} className="bg-red-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-red-700"
                    >
                      CANCELAR
                    </button>
                  </>
                )}
              </div>
            </div>

      <form id="personForm" onSubmit={onSubmit} className="grid grid-cols-12 gap-6">
        {/* Persona */}
        {activeTab === "persona" && (
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">
              Información Personal
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <InputField label="Nombre" value={form.nombre} readOnly={!isEditing} onChange={(v) => handleChange("nombre", v)}  />
              <InputField label="Apellidos" value={form.apellidos} readOnly={!isEditing} onChange={(v) => handleChange("apellidos", v)} />
            </div>
          </div>
        )}

        {/* Consulta */}
        {activeTab === "consulta" && (
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">Consultas</h2>
            <div className="grid grid-cols-8 gap-4">
              <InputField label="Nombre" value={form.nombre} readOnly={!isEditing} className="col-span-3" onChange={(v) => handleChange("nombre", v)} />
              <InputField label="Apellido" value={form.apellidos} readOnly={!isEditing} className="col-span-2" onChange={(v) => handleChange("apellidos", v)}/>
              <InputField label="Direccion" type="text" value={form.direccion} readOnly={!isEditing} className="col-span-3" onChange={(v) => handleChange("direccion", v)} />
              <InputField label="Ciudad" type="text" value={form.ciudad} readOnly={!isEditing} className="col-span-3" onChange={(v) => handleChange("ciudad", v)} />
              <InputField label="Correo" type="email" value={form.email} readOnly={!isEditing} className="col-span-3" onChange={(v) => handleChange("email", v)}/>
              <InputField label="Teléfono" value={form.telefono} readOnly={!isEditing} className="col-span-2" onChange={(v) => handleChange("telefono", v)} />
              {
  !isEditing ? (
    <InputField
      label="Tipo de consulta"
      value={form.tipoConsulta}
      readOnly={true}
      className="col-span-3"
      onChange={(v) => handleChange("tipoConsulta", v)}
    />
  ) : (
    <div className="col-span-3">
      <label className="block text-xs font-bold text-green-700 mb-1">
        Tipo de consulta
      </label>
      <select
        className="w-full border border-green-600 rounded p-2 text-sm bg-white"
        value={form.tipoConsulta}
        onChange={(e) => handleChange("tipoConsulta", e.target.value)}
      >
        <option value="">Seleccione una opción</option>
        <option value="COMPRA">Compra</option>
        <option value="ALQUILER">Alquiler</option>
        <option value="VENTA">Venta</option>
        <option value="EVALUACION">Evaluación</option>
        <option value="HIPOTECA">Hipoteca</option>
        <option value="OTRO">Otro</option>
      </select>
    </div>
  )
}

              <InputField label="Fecha de la consulta" type="datetime-local" value={form.fechaConsulta
                ? new Date(form.fechaConsulta).toISOString().slice(0, 16) : ""
              }
              readOnly={!isEditing} className="col-span-3" onChange={(v) => handleChange("fechaConsulta", v)} />

              <TextAreaField label="Mensaje recibido" value={form.comentario || ""} readOnly={!isEditing} className="col-span-12" onChange={(v) => handleChange("comentario", v)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  </div> 

      <ModalAlert isOpen={showModal} message={modalMessage} onOk={onOkAction} onCancel={onCancelAction} onClose={closeModal} />
    </ScaleIn>
  );
}
          function InputField({ label, value, onChange, readOnly, type = "text", className = "col-span-3",
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
                <label className="block text-xs font-bold text-green-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  className={`w-full border border-green-600 rounded p-2 text-sm ${ readOnly ? "bg-gray-100" : "bg-white"
                  }`}
                  value={value || ""}
                  readOnly={readOnly}
                  onChange={(e) => onChange(e.target.value)}
                />
              </div>
            );
          }

          function TextAreaField({ label, value, onChange, readOnly, className = "col-span-6",
          }: {
            label: string;
            value?: string;
            onChange: (val: string) => void;
            readOnly: boolean;
            className?: string;
          }) {
            return (
              <div className={className}>
                <label className="block text-xs font-bold text-green-600 mb-1">
                  {label}
                  
                </label>
                <textarea
                  className={`w-full border border-green-600 rounded p-2 text-sm min-h-[100px] resize-none ${ readOnly ? "bg-gray-100" : "bg-white"
                  }`}
                  value={value || ""}
                  readOnly={readOnly}
                  onChange={(e) => onChange(e.target.value)}
            >{value}</textarea>
              </div>
            );
          }
