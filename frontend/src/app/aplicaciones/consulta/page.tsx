"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ScaleIn from "@/components/scaleIn";

/* Interfaces comentadas para referencia
interface Doctor {
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  doctor_Id: number;
  medSpeciality?: {
    medSpecialityId: number;
    medSpecialityName: string;
  };
}

interface Hospital {
  hospitalName: string;
  phoneNumber: string;
  hospital_Id: number;
}

interface Appointment {
  appointmentDtlId: number;
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
  address: string;
}

interface SearchParams {
  firstName: string;
  lastName: string;
  cedula: string;
  email: string;
  phone: string;
  direccion: string;
  celular: string;
  ciudad: string;
  accountNumber: string;
}
*/
// Interfaces simplificadas para este ejemplo
interface AppointmentAddress {
  addressId: number;
  address: string;
  city: string;
}

interface Usuario {
  userId: number;
  userName: string;
  email: string;
}

interface Appointment {
  appointmentDtlId: number;
  userId: Usuario;
  appointmentAddress: AppointmentAddress;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consultingType: string;
  status: string;
}

interface SearchParams {
  firstName: string;
  lastName: string;
  direccion: string;
  email: string;
  phone: string;
}

export default function SolicitudPrestamo() {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    firstName: "",
    lastName: "",
    direccion: "",
    email: "",
    phone: "",
  });

  // Cargar usuario solo en cliente
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

  const isAdmin = currentUser?.id === 1;

  // Cargar citas desde API
  useEffect(() => {
    let cancelled = false;

    async function fetchAllAppointments() {
      try {
        const response = await fetch("/api/appointmentdetail/all");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: Appointment[] = await response.json();

        let filteredData = data;

        // Si no es admin, solo mostrar activos
        if (!isAdmin) {
          filteredData = data.filter(a => a.status?.toLowerCase() === "active");
        }

        const userAppointments = currentUser
          ? filteredData.filter(a => currentUser.id === 1 || a.userId?.userId === currentUser.id)
          : filteredData;

        if (!cancelled) {
          setAllAppointments(userAppointments);
          setAppointments(userAppointments);
        }
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else setError("An unknown error occurred.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchAllAppointments();

    return () => { cancelled = true; };
  }, [currentUser]);

  // Filtrar según checkboxes (solo admin)
  useEffect(() => {
    if (!isAdmin) return;

    const filtered = allAppointments.filter(a => {
      const status = a.status?.toLowerCase();
      if (showActive && status === "active") return true;
      if (showInactive && status !== "active") return true;
      return false;
    });

    setAppointments(filtered);
  }, [showActive, showInactive, allAppointments, isAdmin]);

  // Filtros de búsqueda
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredAppointments = allAppointments.filter(a => {
      const matches = 
        (!searchParams.firstName || a.firstName.toLowerCase().includes(searchParams.firstName.toLowerCase())) &&
        (!searchParams.lastName || a.lastName.toLowerCase().includes(searchParams.lastName.toLowerCase())) &&
        (!searchParams.email || a.email.toLowerCase().includes(searchParams.email.toLowerCase())) &&
        (!searchParams.phone || a.phone.toLowerCase().includes(searchParams.phone.toLowerCase())) &&
        (!searchParams.direccion || a.appointmentAddress?.address.toLowerCase().includes(searchParams.direccion.toLowerCase()));

      return matches;
    });

    setAppointments(filteredAppointments);
  };

  return (
    <ScaleIn>
      <div className="flex justify-center py-1 pt-16  px-50">
        <form onSubmit={handleSearch} className="bg-gray-100 border border-green-600 p-6 rounded-xl shadow-md w-full max-w-8xl flex flex-col min-h-[70vh]">
          <h2 className="text-4xl text-green-700 font-semibold text-center mb-4">HAZ TU CONSULTA</h2>

          <div className="col-span-12 flex flex-col items-end pt-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 text-3x1 rounded hover:bg-green-700 transition">
              Buscar
            </button>

            {isAdmin && (
              <div className="flex flex-row gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <input
                    id="showActive"
                    type="checkbox"
                    checked={showActive}
                    onChange={() => setShowActive(!showActive)}
                    className="w-4 h-4 text-green-600 border-green-500 rounded focus:ring-green-500"
                  />
                  <label htmlFor="showActive" className="text-green-700 font-semibold">Activos</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="showInactive"
                    type="checkbox"
                    checked={showInactive}
                    onChange={() => setShowInactive(!showInactive)}
                    className="w-4 h-4 text-green-600 border-green-500 rounded focus:ring-green-500"
                  />
                  <label htmlFor="showInactive" className="text-green-700 font-semibold">Inactivos</label>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-row flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Nombre</label>
              <input type="text" name="firstName" value={searchParams.firstName} onChange={handleChange}
                placeholder="Ingrese el nombre" className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Apellido</label>
              <input type="text" name="lastName" value={searchParams.lastName} onChange={handleChange}
                placeholder="Ingrese el apellido" className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Dirección</label>
              <input type="text" name="direccion" value={searchParams.direccion} onChange={handleChange}
                placeholder="Ingrese la dirección" className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">E-Mail</label>
              <input type="text" name="email" value={searchParams.email} onChange={handleChange}
                placeholder="Ingrese el E-Mail" className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Teléfono</label>
              <input type="text" name="phone" value={searchParams.phone} onChange={handleChange}
                placeholder="Ingrese el teléfono" className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>
          </div>

          {/* Tabla */}
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[900px] w-full border border-green-500 rounded-lg shadow-md">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Apellido</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Dirección</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">E-Mail</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Teléfono</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Tipo de consulta</th>
                  {isAdmin && (
                    <>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Usuario</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Correo Usuario</th>
                    </>
                  )}
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-500">
                {isLoading ? (
                  <tr>
                    <td colSpan={isAdmin ? 8 : 6} className="text-center py-4 text-gray-500 italic">Cargando registros...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={isAdmin ? 8 : 6} className="text-center py-4 text-red-500 font-bold">Error al cargar los datos: {error}</td>
                  </tr>
                ) : appointments.length > 0 ? (
                  appointments.map(a => (
                    <tr key={a.appointmentDtlId} className="hover:bg-gray-300 hover:text-green-800 cursor-pointer transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800">{a.firstName}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{a.lastName}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{a.appointmentAddress?.address}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{a.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{a.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{a.consultingType}</td>
                      {isAdmin && (
                        <>
                          <td className="px-6 py-4 text-sm text-gray-800">{a.userId?.userName}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{a.userId?.email}</td>
                        </>
                      )}
                      <td className="px-4 py-4 text-center w-[120px]">
                        <Link href={`/aplicaciones/persona/${a.appointmentDtlId}`} className="bg-green-600 text-white px-2 py-1 rounded-md text-sm shadow-md hover:bg-green-700 transition inline-block">
                          Ver más
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isAdmin ? 8 : 6} className="text-center py-4 text-gray-500 italic">No hay registros disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </ScaleIn>
  );
}