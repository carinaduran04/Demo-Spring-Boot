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

// Interfaces nuevas de usuario y dirección
interface AppointmentAddress {
  addressId: number;
  address: string;
  city: string;
  createBy: string;
  createDate: string;
  lastUpdateDate: string;
}

interface AppointmentUserType {
  userTypeId: number;
  name: string;
}

interface Usuario {
  userId: number;
  appointmentAddress: AppointmentAddress;
  appointmentUserType: AppointmentUserType;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  email: string;
  title: string;
  lastSessionDate: string;
  createBy: string;
  createDate: string;
  lastUpdateDate: string;
}

interface Appointment {
  appointmentDtlId: number;
  userId: Usuario;
  appointmentAddress: AppointmentAddress;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  consultingDate: string;
  consultingType: string;
  comment: string;
  status: string;
  createBy: string;
  createdDate: string;
  lastUpdateDate: string;
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
    direccion: "",
  });
  // Obtener el usuario logueado desde localStorage
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    async function fetchAllAppointments() {
      try {
        const response = await fetch("/api/appointmentdetail/all");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: Appointment[] = await response.json();

        console.log("Datos crudos de la API:", data);

        // Filtrar solo registros ACTIVE
        const activos = data.filter(
          (appointment) => appointment.status.toLowerCase() === "active"
        );

        const userAppointments = currentUser
          ? activos.filter(
              (appointment) =>
                appointment.userId?.userName.toLowerCase() === currentUser.name.toLowerCase()
            )
          : activos;

        setAllAppointments(userAppointments);
        setAppointments(userAppointments);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else setError("An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllAppointments();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredAppointments = allAppointments.filter((appointment) => {
      const firstNameMatch =
        searchParams.firstName === "" ||
        appointment.firstName.toLowerCase().includes(searchParams.firstName.toLowerCase());
      const lastNameMatch =
        searchParams.lastName === "" ||
        appointment.lastName.toLowerCase().includes(searchParams.lastName.toLowerCase());
      const emailMatch =
        searchParams.email === "" ||
        appointment.email.toLowerCase().includes(searchParams.email.toLowerCase());
      const phoneMatch =
        searchParams.phone === "" ||
        appointment.phone.toLowerCase().includes(searchParams.phone.toLowerCase());
      const direccionMatch =
        searchParams.direccion === "" ||
        appointment.appointmentAddress?.address
          .toLowerCase()
          .includes(searchParams.direccion.toLowerCase());

      return firstNameMatch && lastNameMatch && emailMatch && phoneMatch && direccionMatch;
    });

    setAppointments(filteredAppointments);
  };

  return (
    <ScaleIn>
      <div className="flex justify-center py-1 pt-14">
        <form
          onSubmit={handleSearch}
          className="bg-gray-100 border border-green-600 p-4 rounded-xl shadow-md w-full max-w-7xl flex flex-col min-h-[70vh]"
        >
          <h2 className="text-4xl text-green-700 font-semibold text-center mb-4">Haz tu consulta</h2>

       <div className="col-span-12 flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1.5 text-3x1 rounded hover:bg-green-700"
          >
            Buscar
          </button>

          <Link
            href="/aplicaciones/haz_consulta"
            className="bg-green-600 text-white px-3 py-1.5 text-3x1 rounded hover:bg-green-700 flex items-center justify-center"
          >
            Citas
          </Link>
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
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={searchParams.direccion}
                onChange={handleChange}
                placeholder="Ingrese la dirección"
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-1">
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-green-500 rounded-lg shadow-md">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Nombre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Apellido</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Dirección</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">E-Mail</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Teléfono</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Usuario</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Correo Usuario</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-500">
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                        Cargando registros...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-red-500 font-bold">
                        Error al cargar los datos: {error}
                      </td>
                    </tr>
                  ) : appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr
                        key={appointment.appointmentDtlId}
                        className="hover:bg-gray-300 hover:text-green-800 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.firstName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.appointmentAddress?.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.phone}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.userId?.userName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{appointment.userId?.email}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <Link
                            href={`/aplicaciones/persona/${appointment.appointmentDtlId}`}
                            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-green-700 transition"
                          >
                            Ver más
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-gray-500 italic">
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
    </ScaleIn>
  );
}
