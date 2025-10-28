"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ScaleIn from "@/components/scaleIn";
import ModalAlert from "@/components/modalalert";

interface Usuario {
  userId: number;
  userName: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  company?: string;
  active?: boolean;
}

export default function UsuarioVerMas() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : 0;
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState<Usuario | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onOkAction, setOnOkAction] = useState<(() => void) | null>(null);
  const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) throw new Error("Error al cargar usuario");
        const data = await res.json();
        setUsuario(data);
        setOriginalData(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchUsuario();
  }, [id]);

  // 🔹 Detectar cambios
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

  // 🔹 Guardar cambios
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usuario) return;

    try {
      const response = await fetch(`/api/user/update/${usuario.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) throw new Error("Error al guardar usuario");

      showModalDialog("Usuario actualizado correctamente", () => {
        setOriginalData(usuario);
        setIsEditing(false);
        setHasChanges(false);
      });
    } catch (error) {
      console.error(error);
      showModalDialog("Ocurrió un error al guardar los cambios");
    }
  };

  // 🔹 Eliminar usuario
  const handleDelete = () => {
    if (!usuario) return;
    showModalDialog(
      "¿Seguro que deseas eliminar este usuario?",
      async () => {
        try {
          const res = await fetch(`/api/user/delete/${usuario.userId}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Error al eliminar usuario");
          router.push("/aplicaciones/usuarios");
        } catch (error) {
          console.error(error);
          showModalDialog("Error al eliminar el usuario");
        }
      }
    );
  };

  // 🔹 Cancelar edición
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

  // 🔹 Salir
  const handleExit = () => {
    if (!hasChanges) {
      router.push("/aplicaciones/usuarios");
      return;
    }
    showModalDialog("¿Seguro que deseas salir sin guardar?", () => {
      router.push("/aplicaciones/usuarios");
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
          <span
            className={`px-3 py-1 text-sm font-bold rounded-full ${
              usuario.active
                ? "bg-green-100 text-green-700 border border-green-600"
                : "bg-red-100 text-red-700 border border-red-600"
            }`}
          >
            {usuario.active ? "ACTIVO" : "INACTIVO"}
          </span>

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
              Información Personal
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <InputField label="Nombre" value={usuario.userName} readOnly={!isEditing} onChange={(v) => handleChange("userName", v)} />
              <InputField label="Correo" type="email" value={usuario.email} readOnly={!isEditing} onChange={(v) => handleChange("email", v)} />
              <InputField label="Teléfono" value={usuario.phone || ""} readOnly={!isEditing} onChange={(v) => handleChange("phone", v)} />
              <InputField label="Ciudad" value={usuario.city || ""} readOnly={!isEditing} onChange={(v) => handleChange("city", v)} />
              <InputField label="Dirección" value={usuario.address || ""} readOnly={!isEditing} className="col-span-6" onChange={(v) => handleChange("address", v)} />
              
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

// Subcomponentes reutilizables
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
      <label className="block text-xs font-bold text-green-700 mb-1">{label}</label>
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
