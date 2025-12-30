"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScaleIn from "@/components/scaleIn";
import ModalAlert from "@/components/modalalert";

interface Usuario {
  userId: number;
  userName: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  title?: string;
  userTypeId?: number | string;
  companyId?: number;
  companyName?: string;
  addressId?: number;
  addressName?: string;
  city?: string;
  status?: "ACTIVE" | "INACTIVE";
  
}

interface UsuarioVerMasProps {
  id: number;
}

export default function UsuarioVerMas({ id }: UsuarioVerMasProps) {
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState<Usuario | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onOkAction, setOnOkAction] = useState<(() => void) | null>(null);
  const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);


  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`/api/appointmentuser/${id}`);
        if (!res.ok) throw new Error("Error al cargar usuario");
        const data = await res.json();

        // Mapear los objetos a IDs y nombres para el frontend
        const mappedUser: Usuario = {
          ...data,
          userTypeId: data.appointmentUserType?.userTypeId,
          companyId: data.company?.companyId,
          companyName: data.company?.name,
          addressId: data.address?.addressId,
          addressName: data.address?.address,
        };

        setUsuario(mappedUser);
        setOriginalData(mappedUser);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchUsuario();
  }, [id]);

  useEffect(() => {
    if (isEditing && usuario && originalData) {
      const isEqual = JSON.stringify(usuario) === JSON.stringify(originalData);
      setHasChanges(!isEqual);
    }
  }, [usuario, originalData, isEditing]);

  const handleChange = (field: keyof Usuario, value: string | boolean) => {
    setUsuario((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const showModalDialog = (
    message: string,
    onOk?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ) => {
    setModalMessage(message);
    setOnOkAction(() => onOk || null);
    setOnCancelAction(() => onCancel || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
    setOnOkAction(null);
    setOnCancelAction(null);
  };

  //guardar cambios
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usuario) return;

    try {
      const usuarioToSend = {
        ...usuario,
        appointmentUserType: usuario.userTypeId
          ? { userTypeId: Number(usuario.userTypeId) }
          : null,
        company: usuario.companyId
          ? { companyId: usuario.companyId, name: usuario.companyName } // editar existente
          : usuario.companyName
          ? { name: usuario.companyName } // nueva compañía
          : null,
        address: usuario.addressId
          ? { addressId: usuario.addressId, address: usuario.addressName, city: usuario.city } // editar existente
          : usuario.addressName
          ? { address: usuario.addressName, city: usuario.city } // nueva dirección
          : null,
      };

      const response = await fetch(`/api/appointmentuser/update/${usuario.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioToSend),
      });

      // Capturar el mensaje exacto del backend
      const resultText = await response.text();
      console.log("Respuesta del servidor:", response.status, resultText);

      if (!response.ok) throw new Error("Error al guardar usuario: " + resultText);

      showModalDialog("Usuario actualizado correctamente", () => {
        setOriginalData(usuario);
        setIsEditing(false);
        setHasChanges(false);
      });
    } catch (error: any) {
      console.error("Error en onSubmit:", error);
      showModalDialog("Ocurrió un error al guardar los cambios: " + error.message);
    }
  };

  // eliminar
  const handleDelete = () => {
    if (!usuario) return;

    showModalDialog(
      "¿Seguro que deseas eliminar este usuario?",
      async () => {
        try {
          const res = await fetch(`/api/appointmentuser/delete/${usuario.userId}`, {
            method: "DELETE",
          });

          const resultText = await res.text();
          console.log("Respuesta del backend:", res.status, resultText);

          if (!res.ok) {
            console.error("Error del backend:", resultText);
            throw new Error(resultText);
          }

          // Redirigir al listado de usuarios
          router.push("/aplicaciones/mantenimiento");
        } catch (error: any) {
          console.error("Error en handleDelete:", error);
          showModalDialog("Ocurrió un error al eliminar el usuario: " + error.message);
        }
      }
    );
  };

  const onCancel = () => {
    if (!hasChanges) {
      setIsEditing(false);
      setUsuario(originalData);
      return;
    }
    showModalDialog("¿Cancelar cambios no guardados?", () => {
      setIsEditing(false);
      setUsuario(originalData);
    });
  };

  const handleExit = () => {
    if (!hasChanges) {
      router.push("/aplicaciones/mantenimiento");
      return;
    }
    showModalDialog("¿Seguro que deseas salir sin guardar?", () => {
      router.push("/aplicaciones/mantenimiento");
    });
  };

  if (!usuario)
    return (
      <div className="text-center text-gray-600 p-10">
        Cargando información del usuario...
      </div>
    );

  return (
    <ScaleIn>
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 border-2 border-green-600 rounded-xl shadow m-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 text-sm font-bold rounded-full ${
                usuario.status === "ACTIVE"
                  ? "bg-green-100 text-green-700 border border-green-600"
                  : "bg-red-100 text-red-700 border border-red-600"
              }`}
            >
              {usuario.status === "ACTIVE" ? "Activo" : "Inactivo"}
            </span>

            {isEditing && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={usuario.status === "ACTIVE"}
                  onChange={(e) => handleChange("status", e.target.checked ? "ACTIVE" : "INACTIVE")}
                  className="w-5 h-5 accent-green-600 border border-green-500 rounded cursor-pointer focus:ring-green-500"
                />
                <label htmlFor="activo" className="text-green-700 font-semibold select-none cursor-pointer">
                  {usuario.status === "ACTIVE" ? "Activo" : "Inactivo"}
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  className="bg-green-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-green-700"
                  onClick={() => setIsEditing(true)}
                >
                  EDITAR
                </button>
                <button
                  type="button"
                  className="bg-red-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-red-700"
                  onClick={handleDelete}
                >
                  ELIMINAR
                </button>
                <button
                  type="button"
                  className="bg-green-800 font-bold text-white px-4 py-2 text-sm rounded hover:bg-green-900"
                  onClick={handleExit}
                >
                  SALIR
                </button>
              </>
            ) : (
              <>
                {hasChanges && (
                  <button
                    type="submit"
                    form="usuarioForm"
                    className="bg-green-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-green-700"
                  >
                    GUARDAR
                  </button>
                )}
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-red-600 font-bold text-white px-4 py-2 text-sm rounded hover:bg-red-700"
                >
                  CANCELAR
                </button>
              </>
            )}
          </div>
        </div>

        <form id="usuarioForm" onSubmit={onSubmit} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-bold text-green-700 mb-4">
              Información del Usuario
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <InputField label="Nombre de Usuario" value={usuario.userName} readOnly={!isEditing} onChange={(v) => handleChange("userName", v)} />
              <InputPasswordField label="Contraseña" value={usuario.password || ""} readOnly={!isEditing} onChange={(v) => handleChange("password", v)} />
              <InputField label="Nombre" value={usuario.firstName} readOnly={!isEditing} onChange={(v) => handleChange("firstName", v)} />
              <InputField label="Apellido" value={usuario.lastName} readOnly={!isEditing} onChange={(v) => handleChange("lastName", v)} />
              <InputField label="Correo" type="email" value={usuario.email} readOnly={!isEditing} onChange={(v) => handleChange("email", v)} />
              <InputField label="Título" value={usuario.title || ""} readOnly={!isEditing} onChange={(v) => handleChange("title", v)} />
              <InputField label="Compañía" value={usuario.companyName || ""} readOnly={!isEditing} onChange={(v) => handleChange("companyName", v)} />
              <InputField label="Dirección" value={usuario.addressName || ""} readOnly={!isEditing} onChange={(v) => handleChange("addressName", v)} />

              <div className="col-span-3">
                <label className="block text-xs font-bold text-green-700 mb-1">Tipo de Usuario</label>
                {isEditing ? (
                  <select
                    className="w-full border border-green-600 rounded p-2 text-sm bg-white"
                    value={usuario.userTypeId?.toString() || ""}
                    onChange={(e) => handleChange("userTypeId", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    <option value="1">Administrador</option>
                    <option value="2">Cliente</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    readOnly
                    value={
                      usuario.userTypeId === 1
                        ? "Administrador"
                        : usuario.userTypeId === 2
                        ? "Cliente"
                        : ""
                    }
                    className="w-full border border-green-600 rounded p-2 text-sm bg-gray-100"
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <ModalAlert
        isOpen={showModal}
        message={modalMessage}
        onOk={onOkAction}
        onCancel={onCancelAction}
        onClose={closeModal}
      />
    </ScaleIn>
  );
}

// componentes reutilizables
function InputField({ label, value, onChange, readOnly, type = "text", className = "col-span-3" }:
  { label: string; value?: string; onChange: (val: string) => void; readOnly: boolean; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-green-700 mb-1">{label}</label>
      <input
        type={type}
        className={`w-full border border-green-600 rounded p-2 text-sm ${readOnly ? "bg-gray-100" : "bg-white"}`}
        value={value || ""}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function InputPasswordField({ label, value, onChange, readOnly, className = "col-span-3" }:
  { label: string; value?: string; onChange: (val: string) => void; readOnly: boolean; className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-green-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full border border-green-600 rounded p-2 pr-10 text-sm ${readOnly ? "bg-gray-100" : "bg-white"}`}
          value={value || ""}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
        />
        {!readOnly && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700 text-xs font-semibold">
            {showPassword ? "Ocultar" : "Ver"}
          </button>
        )}
      </div>
    </div>
  );
}
