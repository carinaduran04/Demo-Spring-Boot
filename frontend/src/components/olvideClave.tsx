"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Correo enviado:", email);
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-100 border-2 border-green-600 p-6 rounded-lg shadow-md w-full max-w-sm mx-auto m-20">
      <h2 className="text-xl font-bold mb-4 text-center">¿Olvidaste tu clave?</h2>

      {submitted ? (
        <p className="text-green-600 text-center">
          Si existe una cuenta con ese correo, recibirás instrucciones.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Enviar
          </button>
          <p className="text-center text-sm text-gray-500">
            O contacta a <a href="drtgclous:soporte@tudominio.com" className="text-green-600 underline">soporte técnico</a>
          </p>
        </form>
      )}
    </div>
  );
}
