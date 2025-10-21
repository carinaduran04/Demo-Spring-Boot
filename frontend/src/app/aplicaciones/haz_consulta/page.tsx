"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScaleIn from "@/components/scaleIn";
import ModalAlert from "@/components/modalalert"; 

interface FormData {
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  mensaje: string;
  fecha: string;
  usuarioAsignado?: string; 
}

interface User {
  userId: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title?: string;
}

export default function ConsultaForm() {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    direccion: "",
    ciudad: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: "",
    fecha: "",
    usuarioAsignado: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onOkAction, setOnOkAction] = useState<(() => void) | null>(null);
  const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const adminIds = [1, 6, 7, 8];
  const isAdmin = currentUser ? adminIds.includes(currentUser.userId || (currentUser as any).id) : false;

  // Cargar usuario actual
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      }
    }
  }, []);

  // Cargar usuarios (solo admin)
  useEffect(() => {
    if (!isAdmin) return;
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Error al cargar usuarios");
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [isAdmin]);

  useEffect(() => {
    const hayCambios = Object.values(formData).some((v) => v !== "");
    setHasChanges(hayCambios);
  }, [formData]);

  const handleChangeValue = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showModalDialog = (message: string, onOkActionParam?: () => void, onCancelActionParam?: () => void) => {
    setModalMessage(message);
    setOnOkAction(onOkActionParam || null);
    setOnCancelAction(onCancelActionParam || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
    setOnOkAction(null);
    setOnCancelAction(null);
  };

 const handleCancel = () => {
    showModalDialog(
      "¿Seguro que deseas cancelar la cita?",
      () => setFormData({
        nombre: "", apellido: "", direccion: "", ciudad: "", email: "",
        telefono: "", tipoConsulta: "", mensaje: "", fecha: "", usuarioAsignado: "",
      })
    );
  };

  const formatPhone = (input: string) => {
    const digits = input.replace(/\D/g, "");
    if (/^(809|829|849)\d{7}$/.test(digits)) return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    if (/^\d{10}$/.test(digits)) return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return null;
  };

  const handlePhoneChange = (value: string) => {
    let digits = value.replace(/\D/g, "");
    if (digits.length > 10) digits = digits.slice(0, 10);
    let formatted = digits;
    if (digits.length > 3 && digits.length <= 6) formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
    else if (digits.length > 6) formatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    handleChangeValue("telefono", formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) { showModalDialog("No hay usuario logueado"); return; }

    const formattedPhone = formatPhone(formData.telefono);
    if (!formattedPhone) { showModalDialog("Número de teléfono inválido"); return; }

    const payload = {
      firstName: (formData.nombre ?? "").toUpperCase(),
      lastName: (formData.apellido ?? "").toUpperCase(),
      fullName: `${formData.nombre ?? ""} ${formData.apellido ?? ""}`.toUpperCase(),
      email: formData.email,
      phone: formattedPhone,
      consultingType: (formData.tipoConsulta ?? "").toUpperCase(),
      comment: (formData.mensaje ?? "").toUpperCase(),
      consultingDate: formData.fecha,
      status: "ACTIVE",
      createBy: "FRONTEND",
      userId: isAdmin && formData.usuarioAsignado 
        ? { userId: Number(formData.usuarioAsignado) } // admin asigna
        : { userId: Number(currentUser.userId || (currentUser as any).id) }, // normal se asigna a sí mismo
      appointmentAddress: {
        address: (formData.direccion ?? "").toUpperCase(),
        city: (formData.ciudad ?? "").toUpperCase(),
      },
    };

    try {
      const res = await fetch("/api/appointmentdetail/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showModalDialog("Cita agregada con éxito", () => setFormData({
          nombre: "", apellido: "", direccion: "", ciudad: "", email: "",
          telefono: "", tipoConsulta: "", mensaje: "", fecha: "", usuarioAsignado: "",
        }));
      } else {
        const errorText = await res.text();
        console.error("Error servidor:", errorText);
        showModalDialog("Error al agregar cita");
      }
    } catch (err) {
      console.error(err);
      showModalDialog("Error de conexión");
    }
  };

  return (
    <>
      <ScaleIn>
        <div className="m-8 max-w-6xl mx-auto p-8 bg-gray-100 shadow-md rounded-sm border border-green-500 min-h-[60vh]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">CREAR NUEVA CITA</h2>
              <p className="font-bold text-gray-700">Cuéntanos lo que buscas y lo haremos realidad.</p>
            </div>
            <img src="/logo18.png" alt="Logo" className="w-20 h-auto"/>
          </div>
          <div className="bg-gray-50 border border-green-500 shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Nombre<span className="text-red-500">*</span></label>
                  <input type="text" value={formData.nombre} onChange={(e) => handleChangeValue("nombre", e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Apellido<span className="text-red-500">*</span></label>
                  <input type="text" value={formData.apellido} onChange={(e) => handleChangeValue("apellido", e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Dirección<span className="text-red-500">*</span></label>
                  <input type="text" value={formData.direccion} onChange={(e) => handleChangeValue("direccion", e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Ciudad<span className="text-red-500">*</span></label>
                  <input type="text" value={formData.ciudad} onChange={(e) => handleChangeValue("ciudad", e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Email<span className="text-red-500">*</span></label>
                  <input type="email" value={formData.email} onChange={(e) => handleChangeValue("email", e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Teléfono<span className="text-red-500">*</span></label>
                  <input type="tel" value={formData.telefono} onChange={(e) => handlePhoneChange(e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Tipo de consulta<span className="text-red-500">*</span></label>
                  <select value={formData.tipoConsulta} onChange={(e) => handleChangeValue("tipoConsulta", e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Seleccione una opción</option>
                    <option value="compra">Compra</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="venta">Venta</option>
                    <option value="evaluacion">Evaluación</option>
                    <option value="hipoteca">Hipoteca</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-1">Fecha de la consulta<span className="text-red-500">*</span></label>
                  <input type="date" value={formData.fecha} onChange={(e) => handleChangeValue("fecha", e.target.value)} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>

              {isAdmin && (
                <div>
                  <label className="block text-green-700 font-semibold mb-1">
                    Usuario asignado<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.usuarioAsignado || ""}
                    onChange={(e) => handleChangeValue("usuarioAsignado", e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Seleccione un usuario</option>
                    <option value="3">Caroven</option>
                    <option value="2">Eddylo</option>
                  </select>
                </div>
                )}
              </div>

              <div>
                <label className="block text-green-700 font-semibold mb-1">Mensaje<span className="text-red-500">*</span></label>
                <textarea value={formData.mensaje} onChange={(e) => { handleChangeValue("mensaje", e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }} placeholder="Escribe tu mensaje aquí..." rows={1} required className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none overflow-hidden"/>
              </div>
              <div className="flex justify-center gap-6">
                <button
                  type="submit"
                  className="text-xl bg-green-700 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-green-700 border-2 border-green-600 transition"
                >
                  CONFIRMAR CITA ➔
                </button>

                {!hasChanges ? (
                  <button type="button" onClick={() => router.push("/aplicaciones/consulta")} className="text-xl bg-gray-700 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-gray-700 border-2 border-gray-700 transition">
                    SALIR ⬅
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-xl bg-red-600 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-red-600 border-2 border-red-600 transition"
                  >
                    CANCELAR ✖
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </ScaleIn>

      <ModalAlert isOpen={showModal} message={modalMessage} onOk={onOkAction} onCancel={onCancelAction} onClose={closeModal}/>
    </>
  );
}
