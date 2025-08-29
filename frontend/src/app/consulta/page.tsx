"use client";
import Link from "next/link";
import React from "react";

export default function SolicitudPrestamo() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();
  
  return (
  <div className="flex justify-center py-10">
      <form
        onSubmit={onSubmit}
        className="bg-white border border-green-600 p-6 rounded-xl shadow-md w-full max-w-6xl flex flex-col min-h-[750px]"
      >
        <h2 className="text-lg font-semibold text-center mb-6">
          Haz tu consulta
        </h2>

        <div className="flex flex-row flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">**Nombre</label>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">**Apellido</label>
            <input
              type="text"
              placeholder="Ingrese el apellido"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">**Cédula</label>
            <input
              type="text"
              placeholder="Ingrese la cédula"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">**E-Mail</label>
            <input
              type="text"
              placeholder="Ingrese el E-Mail"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">**Teléfono</label>
            <input
              type="text"
              placeholder="Ingrese el teléfono"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">**Celular</label>
            <input
              type="text"
              placeholder="Ingrese el celular"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">**Ciudad</label>
            <input
              type="text"
              placeholder="Ingrese la ciudad"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold mb-1">
              **No. de Cuenta
            </label>
            <input
              type="text"
              placeholder="Ingrese el No. de Cuenta"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
           <Link 
            href="/"
            type="button"
            className="bg-green-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-green-700"
          >
            Agregar
          </Link >
         <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200">
            Buscar
         </button>
        </div> 

          <div className="mt-6">
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg shadow-md min-h-[300px]">
                <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Nombre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Apellido</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Cédula</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">E-Mail</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Teléfono</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Celular</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Ciudad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">No. de Cuenta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                  No hay registros disponibles
                </td>
              </tr>
            </tbody>
             </table>
         </div>
        </div>
      </form>
    </div>
  );
}
