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
    address: "",
    city: "",
   
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
    const cleanEmail = form.email ? form.email.trim().toLowerCase() : "";

   
    if (!form.userTypeId || isNaN(parseInt(form.userTypeId))) {
      setModalMessage("Debe seleccionar un tipo de usuario válido");
      setShowModal(true);
      return;
    }

    const payload = {
      userName: form.userName,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      fullName: `${form.firstName} ${form.lastName}`,
      email: cleanEmail,
      title: form.title,
      role: form.role,
      company:
        form.userTypeId === "1" || form.userTypeId === "2"
          ? { name: form.company }
          : null,
      address: { address: form.address, city: form.city,  createBy: "admin", createDate: new Date().toISOString()},
      appointmentUserType: { userTypeId: parseInt(form.userTypeId) },
      createDate: new Date().toISOString(),
      createBy: "admin",
    };
  try {
    const res = await fetch("/api/appointmentuser/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let bodyText = await res.text();
    let data;
    try {
      data = JSON.parse(bodyText);
    } catch {
      data = bodyText;
    }

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
          address: "",
          city: "",
    });
  } else {
 
  // Depuración temporal para ver la respuesta exacta del backend
        console.log("Respuesta del servidor:", data);

        const msg =
          typeof data === "string"
            ? data.toLowerCase()
            : JSON.stringify(data).toLowerCase();

        // Detección más precisa de errores
        if (
          res.status === 409 ||
          (msg.includes("correo") &&
            (msg.includes("existe") ||
              msg.includes("duplicate") ||
              msg.includes("registrado"))) ||
          (msg.includes("email") &&
            (msg.includes("existe") ||
              msg.includes("duplicate") ||
              msg.includes("registrado")))
        ) {
          setModalMessage("El correo electrónico ya está registrado. Intente con otro.");
        } else if (
          msg.includes("usuario") &&
          (msg.includes("existe") ||
            msg.includes("duplicate") ||
            msg.includes("en uso"))
        ) {
          setModalMessage("El nombre de usuario ya está en uso. Intente con otro.");
        } else {
          setModalMessage(`Error al crear usuario: ${msg}`);
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
          address: "",
          city: "",
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
                {/* Usuario y Contraseña */}
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

                {/* Nombre y Apellido */}
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

                {/* Email y Título */}
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
                    Título
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition duration-200"
                  />
                </div>

                {/* Dirección y Ciudad */}
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Dirección<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Ciudad<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                  />
                </div>

              {/* Compañía siempre visible */}
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Compañía
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nombre de la compañía"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                  />
                </div>
               {/* Tipo de usuario */}
                <div>
                  <label className="block text-green-700 font-semibold mb-2">
                    Tipo de usuario<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="userTypeId"
                    value={form.userTypeId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                  >
                    <option value="">Seleccione tipo de usuario</option>
                    <option value="1">ADMIN</option>
                    <option value="2">CLIENT</option>
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
                    onClick={() => router.push("/aplicaciones/mantenimiento")}
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
