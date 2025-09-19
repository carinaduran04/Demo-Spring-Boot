"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";


interface Doctor {
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  doctor_Id: number;
}

interface Hospital {
  hospitalName: string;
  phoneNumber: string;
  hospital_Id: number;
}

interface Appointment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
  appointmentDate: string;
  createdBy: string;
  lastUpdateDate: string;
  createDate: string;
  field1: null;
  field2: null;
  field3: null;
  doctor: Doctor;
  hospital: Hospital;
  cedula?: string;
  celular?: string;
  ciudad?: string;
  noCuenta?: string;
}

interface SearchParams {
  firstName: string;
  lastName: string;
  cedula: string;
  email: string;
  phone: string;
  celular: string;
  ciudad: string;
  accountNumber: string;
}

export default function SolicitudPrestamo() {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    firstName: "",
    lastName: "",
    cedula: "",
    email: "",
    phone: "",
    celular: "",
    ciudad: "",
    accountNumber: "",
  });

  useEffect(() => {
    async function fetchAllAppointments() {
      try {
        const response = await fetch("/api/appointment/all"); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Appointment[] = await response.json();
        setAllAppointments(data);
        setAppointments(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllAppointments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredAppointments = allAppointments.filter(appointment => {
      const firstNameMatch =
        searchParams.firstName === "" ||
        appointment.firstName.toLowerCase().includes(searchParams.firstName.toLowerCase());
      const lastNameMatch =
        searchParams.lastName === "" ||
        appointment.lastName.toLowerCase().includes(searchParams.lastName.toLowerCase());
      const cedulaMatch =
        searchParams.cedula === "" ||
        (appointment.cedula && appointment.cedula.toLowerCase().includes(searchParams.cedula.toLowerCase()));
      const emailMatch =
        searchParams.email === "" ||
        appointment.email.toLowerCase().includes(searchParams.email.toLowerCase());
      const phoneMatch =
        searchParams.phone === "" ||
        appointment.phone.toLowerCase().includes(searchParams.phone.toLowerCase());

      return firstNameMatch && lastNameMatch && cedulaMatch && emailMatch && phoneMatch;
    });

    setAppointments(filteredAppointments);
  };

  return (
    <div className="flex justify-center py-1">
      <form
        onSubmit={handleSearch}
        className="bg-gray-100 border border-green-600 p-6 rounded-xl shadow-md w-full max-w-6xl flex flex-col min-h-[750px]"
      > 
        <h2 className="text-2xl text-green-700 font-semibold text-center mb-4">Haz tu consulta</h2>

          <div className="col-span-12 flex justify-end gap-2 pt-2">
          <Link
            href="/aplicaciones/agregar"
            className="bg-green-600 text-white px-3 py-1.5 text-sm rounded hover:bg-green-700"
          >
            Agregar
          </Link>

          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1.5 text-sm rounded hover:bg-green-700"
          >
            Buscar
          </button>

          <button
            type="button"
            className="bg-green-600 text-white px-3 py-1.5 text-sm rounded hover:bg-green-700"
            onClick={() => alert("¿Seguro que deseas eliminar?")}
          >
            Eliminar
          </button>
        </div>
         <div className="mt-6"></div>
<div className="flex flex-row flex-wrap gap-4 mb-6">
  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">Nombre</label>
    <input
      type="text"
      name="firstName"
      value={searchParams.firstName}
      onChange={handleChange}
      placeholder="Ingrese el nombre"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">Apellido</label>
    <input
      type="text"
      name="lastName"
      value={searchParams.lastName}
      onChange={handleChange}
      placeholder="Ingrese el apellido"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">Cédula</label>
    <input
      type="text"
      name="cedula"
      value={searchParams.cedula}
      onChange={handleChange}
      placeholder="Ingrese la cédula"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">E-Mail</label>
    <input
      type="text"
      name="email"
      value={searchParams.email}
      onChange={handleChange}
      placeholder="Ingrese el E-Mail"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">Teléfono</label>
    <input
      type="text"
      name="phone"
      value={searchParams.phone}
      onChange={handleChange}
      placeholder="Ingrese el teléfono"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">Celular</label>
    <input
      type="text"
      name="celular"
      value={searchParams.celular}
      onChange={handleChange}
      placeholder="Ingrese el celular"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">Ciudad</label>
    <input
      type="text"
      name="ciudad"
      value={searchParams.ciudad}
      onChange={handleChange}
      placeholder="Ingrese la ciudad"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <div className="flex-1 min-w-[200px]">
    <label className="block text-base text-green-700 font-bold mb-1">No. de Cuenta</label>
    <input
      type="text"
      name="accountNumber"
      value={searchParams.accountNumber}
      onChange={handleChange}
      placeholder="Ingrese el No. de Cuenta"
      className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
</div>

          <div className="mt-1">
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-green-500 rounded-lg shadow-md min-h-[300px]">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Nombre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Apellido</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Cédula</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">E-Mail</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Teléfono</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Celular</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Ciudad</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">No. de Cuenta</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-500">
                  {isLoading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                        Cargando registros...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-red-500 font-bold">
                        Error al cargar los datos: {error}
                      </td>
                    </tr>
                  ) : appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.firstName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.cedula || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.celular || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.ciudad || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.noCuenta || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                         
                         <Link
                            href={`/aplicaciones/persona/${appointment.id}`}
                            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-green-700 transition"
                          >
                            Ver más
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                        No hay registros disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </form>
    </div>
  );
}
