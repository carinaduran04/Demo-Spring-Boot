"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScaleIn from "@/components/scaleIn";

interface FormData {
  nombre: string;
  apellido: string;
  direccion: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  mensaje: string;
  fecha: string;
}

export default function ConsultaForm() {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: "",
    fecha: "",
  });

  useEffect(() => {
    const hayCambios = Object.values(formData).some((v) => v !== "");
    setHasChanges(hayCambios);
  }, [formData]);

  const handleChangeValue = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (confirm("¿Seguro que deseas cancelar la cita?")) {
      router.push("/aplicaciones/consulta");
    }
    
  };const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const loggedUser = localStorage.getItem("user");
  if (!loggedUser) return alert("No hay usuario logueado");

  const user = JSON.parse(loggedUser);

  const payload = {
    firstName: formData.nombre,
    lastName: formData.apellido,
    fullName: `${formData.nombre} ${formData.apellido}`,
    phone: formData.telefono,
    email: formData.email,
    consultingType: formData.tipoConsulta,
    comment: formData.mensaje,
    consultingDate: new Date(formData.fecha + "T00:00:00").toISOString(),
    status: "ACTIVE",
    createBy: "FRONTEND",
    userId: {
      userId: Number(user.userId || user.id),
      appointmentAddress: {
        address: formData.direccion,
        city: "Desconocido",
      },
      appointmentUserType: { userTypeId: 2, name: "LOAN" }, 
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      title: user.title,
    },
    appointmentAddress: {
      address: formData.direccion,
      city: "Desconocido",
    },
  };

  try {
    const res = await fetch("/api/appointmentdetail/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Cita agregada con éxito");
      setFormData({
        nombre: "",
        apellido: "",
        direccion: "",
        email: "",
        telefono: "",
        tipoConsulta: "",
        mensaje: "",
        fecha: "",
      });
    } else {
      const errorText = await res.text();
      console.error("Error servidor:", errorText);
      alert("Error al agregar cita");
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión");
  }
};

  return (
    <ScaleIn>
      <div className="m-12 max-w-5xl mx-auto p-8 bg-gray-100 shadow-md rounded-sm border border-green-500 min-h-[60vh]">
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          Formulario de Consultas
        </h2>
        <p className="font-bold text-gray-700 mb-6">
          Cuéntanos lo que buscas y lo haremos realidad.
        </p>

        <div className="bg-gray-50 border border-green-500 shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-green-700 font-semibold mb-1">
                  Nombre<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleChangeValue("nombre", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-green-700 font-semibold mb-1">
                  Apellido<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => handleChangeValue("apellido", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-green-700 font-semibold mb-1">
                  Dirección<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => handleChangeValue("direccion", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-green-700 font-semibold mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChangeValue("email", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-green-700 font-semibold mb-1">
                  Teléfono<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleChangeValue("telefono", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-green-700 font-semibold mb-1">
                  Tipo de consulta<span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.tipoConsulta}
                  onChange={(e) => handleChangeValue("tipoConsulta", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
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
                <label className="block text-green-700 font-semibold mb-1">
                  Fecha de la consulta<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => handleChangeValue("fecha", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">
                Mensaje<span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => {
                  handleChangeValue("mensaje", e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                placeholder="Escribe tu mensaje aquí..."
                rows={1}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none overflow-hidden"
              ></textarea>
            </div>

            <div className="flex justify-center gap-6">
              <button
                type="submit"
                className="text-xl bg-green-700 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-green-700 border-2 border-green-600 transition"
              >
                Confirmar Cita ➔
              </button>

              {hasChanges && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-xl bg-red-600 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-red-600 border-2 border-red-600 transition"
                >
                  Cancelar ✖
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ScaleIn>
  );
}
