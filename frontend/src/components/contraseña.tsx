"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="max-w-sm mx-auto m-20 bg-gray-100 border-2 border-green-600 p-6 rounded shadow-md ">
      <h2 className="text-xl font-bold mb-4 text-center">Cambiar Contraseña</h2>

      {step === 1 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 text-center">
            Ingresa el código que te enviamos por correo
          </p>
          <input
            type="text"
            placeholder="Código"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={() => setStep(2)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Verificar Código
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Cambiar Contraseña
          </button>
        </div>
      )}
    </div>
  );
}
