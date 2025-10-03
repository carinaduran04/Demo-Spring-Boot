"use client";
import { useState, useEffect } from "react";

interface ConsultaFormProps {
  data?: {
    nombre?: string;
    apellidos?: string;
    email?: string;
    telefono?: string;
  };
}

export default function ConsultaForm({ data }: ConsultaFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: "",
  });

  //  Prellenar si vienen datos de persona
  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        nombre: data.nombre || "",
        apellido: data.apellidos || "",
        email: data.email || "",
        telefono: data.telefono || "",
      }));
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/consultas", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Formulario enviado con éxito");
        console.log("Formulario enviado:", formData);

        setFormData({
          nombre: data?.nombre || "",
          apellido: data?.apellidos || "",
          email: data?.email || "",
          telefono: data?.telefono || "",
          tipoConsulta: "",
          mensaje: "",
        });
      } else {
        alert("❌ Hubo un error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error de conexión");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-sm border border-green-500 max-h-screen overflow-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-2">
        Formulario de Consultas
      </h2>
      <p className="font-bold text-black-700 mb-6">
        Cuéntanos lo que buscas y lo haremos realidad.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Nombre<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
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
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Tipo de consulta<span className="text-red-500">*</span>
          </label>
          <select
            name="tipoConsulta"
            value={formData.tipoConsulta}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione una opción</option>
            <option value="compra">Compra</option>
            <option value="alquiler">Alquiler</option>
            <option value="ventana">Ventana</option>
            <option value="evaluacion">Evaluación</option>
            <option value="hipoteca">Hipoteca</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Mensaje<span className="text-red-500">*</span>
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={5}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-white hover:text-green-600 hover:border hover:border-green-600 transition"
        >
          Enviar Consulta
        </button>
      </form>
    </div>
  );
}
