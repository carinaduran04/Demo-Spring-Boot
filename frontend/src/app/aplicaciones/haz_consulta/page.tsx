"use client";
import { useState } from "react";
import ScaleIn from "@/components/scaleIn";

interface Usuario {
  appointmentDtlId: number;
  userId: {
    userId: number;
    appointmentAddress: {
      addressId: number;
      address: string;
      city: string;
      createBy: string;
      createDate: Date;
      lastUpdateDate: Date;
    };
    appointmentUserType: {
      userTypeId: number;
      name: string;
    };
    userName: string;
    password: number;
    firstName: string;
    lastName: string;
    fullName: string;
    role: string | number;
    email: string;
    title: string;
    lastSessionDate: Date;
    createBy: string;
    createDate: Date;
    lastUpdateDate: Date;
  };
  appointmentAddress: {
    addressId: number;
    address: string;
    city: string;
    createBy: string;
    createDate: Date;
    lastUpdateDate: Date;
  };
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  consultingDate: Date;
  consultingType: string;
  comment: string;
  status: string;
  createBy: string;
  createdDate: Date;
  lastUpdateDate: Date;
}

export default function ConsultaForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: "",
    fecha: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generamos payload tipo Usuario/AppointmentDetail
    const payload: Partial<Usuario> = {
      appointmentDtlId: Math.floor(Math.random() * 10000), 
      firstName: formData.nombre,
      lastName: formData.apellido,
      fullName: `${formData.nombre} ${formData.apellido}`,
      phone: formData.telefono,
      email: formData.email,
      consultingType: formData.tipoConsulta,
      comment: formData.mensaje,
      consultingDate: new Date(formData.fecha),
      status: "ACTIVE",
      createBy: "FRONTEND",
      createdDate: new Date(),
      lastUpdateDate: new Date(),
      userId: {
        userId: 1,
        userName: formData.nombre,
        password: 1234,
        firstName: formData.nombre,
        lastName: formData.apellido,
        fullName: `${formData.nombre} ${formData.apellido}`,
        role: "2",
        email: formData.email,
        title: "Cliente",
        lastSessionDate: new Date(),
        createBy: "FRONTEND",
        createDate: new Date(),
        lastUpdateDate: new Date(),
        appointmentAddress: {
          addressId: 1,
          address: "Desconocido",
          city: "Desconocido",
          createBy: "FRONTEND",
          createDate: new Date(),
          lastUpdateDate: new Date(),
        },
        appointmentUserType: {
          userTypeId: 2,
          name: "LOAN",
        },
      },
      appointmentAddress: {
        addressId: 1,
        address: "Desconocido",
        city: "Desconocido",
        createBy: "FRONTEND",
        createDate: new Date(),
        lastUpdateDate: new Date(),
      },
    };

    try {
    
      const res = await fetch("/api/appointmentdetail/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Formulario enviado con éxito");
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          tipoConsulta: "",
          mensaje: "",
          fecha: "",
        });
      } else {
        alert("Hubo un error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error de conexión");
    }
  };

  return (
    <ScaleIn>
      <div className=" m-12 max-w-5xl mx-auto p-4 bg-gray-100 shadow-md rounded-sm border border-green-500 min-h-[60vh]">
        <h2 className="text-3xl font-bold text-green-700 mb-2">Formulario de Consultas</h2>
        <p className="font-bold text-gray-700 mb-6">
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
                placeholder="Luis"
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
                placeholder="Almonte"
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="almo23@ejemplo.com"
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
                placeholder="8297357987"
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
                <option value="venta">Venta</option>
                <option value="evaluacion">Evaluación</option>
                <option value="hipoteca">Hipoteca</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-1">
                Fecha de la consulta <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
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
              name="mensaje"
              value={formData.mensaje}
              onChange={(e) => {
                handleChange(e);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Escribe tu mensaje aquí..."
              rows={1}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none overflow-hidden"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="text-xl bg-green-700 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-green-700 border-2 border-green-600 transition"
            >
              Confirmar Cita ➔
            </button>
          </div>
        </form>
      </div>
    </ScaleIn>
  );
}
