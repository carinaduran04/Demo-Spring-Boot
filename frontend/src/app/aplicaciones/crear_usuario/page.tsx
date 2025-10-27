"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScaleIn from "@/components/scaleIn";
import ModalAlert from "@/components/modalalert";

export default function CrearUsuario() {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    userTypeId: "",
    company: "",
    role: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onOkAction, setOnOkAction] = useState<(() => void) | null>(null);
  const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const hayCambios = Object.values(form).some((v) => v !== "");
    setHasChanges(hayCambios);
  }, [form]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  const payload = {
    userName: form.userName,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    fullName: `${form.firstName} ${form.lastName}`,
    email: form.email,
    title: form.title,
    userTypeId: parseInt(form.userTypeId),
    company: form.company,
    role: form.role,
    createDate: new Date().toISOString(),
    createBy: "admin",
  };

  try {
    const res = await fetch("/api/appointmentuser/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

     if (res.ok) {
    setModalMessage("Usuario creado correctamente");
    setForm({
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      userTypeId: "",
      company: "",
      role: "",
    });
  } else {
    // Leer texto o JSON de error
    let errorText = "";
    try {
      const data = await res.json();
      errorText = JSON.stringify(data);
    } catch {
      errorText = await res.text();
    }

   // console.error("Error del backend:", errorText);

    // Detectar si es un error típico de email duplicado
    if (
      res.status === 409 ||
      errorText.toLowerCase().includes("duplicate") ||
      errorText.toLowerCase().includes("email") ||
      errorText.toLowerCase().includes("unique") ||
      errorText.toLowerCase().includes("constraint") ||
      errorText.toLowerCase().includes("internal server error")
    ) {
      setModalMessage("El correo electrónico ya está registrado. Intente con otro.");
    } else {
      setModalMessage("Error al crear usuario. Intente nuevamente.");
    }
  }
  
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setModalMessage("Error de conexión con el servidor");
      setShowModal(true);
    }
  };

const handleCancel = () => {
  if (hasChanges) {
    setModalMessage("¿Seguro que deseas cancelar el registro?");
    setOnOkAction(() => () => {
      setForm({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        userTypeId: "",
        company: "",
        role: "",
      });
      setHasChanges(false);
      setShowModal(false); // Cierra el modal
    });
    setOnCancelAction(() => () => {
      setShowModal(false);
    });
    setShowModal(true);
  }
};


const closeModal = () => {
  setShowModal(false);
  setOnOkAction(null);
  setOnCancelAction(null);
};

  return (
    <>
      <ScaleIn>
        <div className="m-8 max-w-6xl mx-auto p-8 bg-gray-100 shadow-md rounded-sm border border-green-500 min-h-[60vh]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                CREAR NUEVO USUARIO
              </h2>
              <p className="font-bold text-gray-700">
                Complete la información del nuevo usuario del sistema.
              </p>
            </div>
            <img src="/logo18.png" alt="Logo" className="w-20 h-auto" />
          </div>

          <div className="bg-gray-50 border border-green-500 shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Nombre de usuario<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Contraseña<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Nombre<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Apellido<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Correo electrónico<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Compañía<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Título
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Tipo de usuario<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="userTypeId"
                    value={form.userTypeId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  >
                    <option value="">Seleccione tipo de usuario</option>
                    <option value="1">ADMIN</option>
                    <option value="2">LOAN</option>
                    <option value="3">MED</option>
                    <option value="4">SALES</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center gap-6 pt-4">
                <button
                  type="submit"
                  className="text-xl bg-green-700 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-green-700 border-2 border-green-600 transition"
                >
                  CREAR USUARIO ➔
                </button>

                {!hasChanges ? (
                  <button
                    type="button"
                    onClick={() => router.push("/aplicaciones/inicio")}
                    className="text-xl bg-gray-700 font-bold text-white px-12 py-2 rounded hover:bg-white hover:text-gray-700 border-2 border-gray-700 transition"
                  >
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

    {showModal && (
      <ModalAlert
        isOpen={showModal}
        message={modalMessage}
        onOk={onOkAction}
        onCancel={onCancelAction}
        onClose={closeModal}
      />
       )}
    </>
  );
}
