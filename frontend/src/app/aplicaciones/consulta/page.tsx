"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ScaleIn from "@/components/scaleIn";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

interface AppointmentAddress {
  addressId: number;
  address: string;
  city: string;
}

interface Usuario {
  userId: number;
  userName: string;
  email: string;
  company?: string; 
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
  consultingDate: string; 
  status: string;
  
}

interface SearchParams {
  firstName: string;
  lastName: string;
  direccion: string;
  email: string;
  phone: string;
  consultingType: string;
  fecha: string;
  fechaInicio: string,
  fechaFin: string,
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
    consultingType: "",
    fecha: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const adminIds = [1, 6, 7, 8];
  const isAdmin = adminIds.includes(currentUser?.id);

  const tableRef = useRef<HTMLTableElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "CITAS REGISTRADAS",
    pageStyle: `
      @media print {
        body { font-size: 10px; color: black; }
        .no-print { display: none !important; }

        table { width: 100% !important; border-collapse: collapse; }
        th, td { padding: 4px !important; font-size: 10px !important; border: 1px solid #000; }

        /* Column headers en verde */
        th { color: green !important; }

        /* Encabezado */
        .print-header {
          text-align: center;
          margin-bottom: 10px;
        }
        .print-header img {
          width: 80px;
          height: auto;
          margin-bottom: 5px;
        }
        .print-title {
          font-size: 18px;
          font-weight: bold;
          color: green !important;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    `,
  });

   useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser: Usuario = JSON.parse(storedUser);
          setCurrentUser(parsedUser);
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchAllAppointments() {
      try {
        const response = await fetch("/api/appointmentdetail/all");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: Appointment[] = await response.json();

        let filteredData: Appointment[] = [];

        if (isAdmin) {
          filteredData = data;
        } else if (currentUser) {
          filteredData = data.filter(a => a.userId?.userId === currentUser.id);
        }

        if (!cancelled) {
          setAllAppointments(filteredData);
          setAppointments(filteredData);
        }
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else setError("An unknown error occurred.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchAllAppointments();

    return () => {
      cancelled = true;
    };
  }, [currentUser, isAdmin]);

  useEffect(() => {
    const filtered = allAppointments.filter(a => {
      const status = a.status?.toLowerCase();
      if (!showActive && status === "active") return false;
      if (!showInactive && status !== "active") return false;
      return true;
    });
    setAppointments(filtered);
  }, [showActive, showInactive, allAppointments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredAppointments = allAppointments.filter(a => {
      const status = a.status?.toLowerCase();
      if (!showActive && status === "active") return false;
      if (!showInactive && status !== "active") return false;

    const citaDate = new Date(a.consultingDate);
    const desde = searchParams.fechaInicio ? new Date(searchParams.fechaInicio) : null;
    const hasta = searchParams.fechaFin ? new Date(searchParams.fechaFin) : null;
   
    if (desde && hasta && desde.getTime() === hasta.getTime()) {
      const citaString = citaDate.toISOString().split("T")[0];
      const desdeString = desde.toISOString().split("T")[0];
      return citaString === desdeString;
    }

    if (desde && citaDate < desde) return false;
    if (hasta && citaDate > hasta) return false;


      const matches =
    (!searchParams.firstName || a.firstName.toLowerCase().startsWith(searchParams.firstName.toLowerCase())) &&
    (!searchParams.lastName || a.lastName.toLowerCase().startsWith(searchParams.lastName.toLowerCase())) &&
    (!searchParams.email || a.email.toLowerCase().startsWith(searchParams.email.toLowerCase())) &&
    (!searchParams.phone || a.phone.toLowerCase().startsWith(searchParams.phone.toLowerCase())) &&
    (!searchParams.consultingType || a.consultingType.toLowerCase().startsWith(searchParams.consultingType.toLowerCase())) &&
    (!searchParams.direccion || a.appointmentAddress?.address.toLowerCase().startsWith(searchParams.direccion.toLowerCase()));

  return matches;
});

    setAppointments(filteredAppointments);
    setCurrentPage(1);
  };

   function formatDateTime(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleString("es-DO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, 
      })
      .replace(",", ""); 
  }

  //  Paginación
  const totalPages = Math.ceil(appointments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedAppointments = appointments.slice(startIndex, endIndex);
 
  return (
    <ScaleIn>
      <div className="flex justify-center py-1 pt-8 px-50">
        <form
          onSubmit={handleSearch}
          className="bg-gray-100 border border-green-600 p-6 rounded-xl shadow-md  w-full max-w-[110%] mx-auto flex flex-col min-h-[50vh]"
        >
          <h2 className="print-title text-4xl text-green-700 font-semibold text-center mb-2 no.print">
            HAZ TU CONSULTA
          </h2>
         
          <div className="col-span-12 flex flex-col items-end pt-0">
            <div className="flex gap-4 mb-4">
              <button
                type="submit"
                className="bg-green-600 font-bold text-white px-4 py-2 text-3x1 rounded hover:bg-green-700 transition"
              >
                BUSCAR
              </button>
              {/* Botón de impresión: solo visible si hay datos */}
              {paginatedAppointments.length > 0 && (
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-green-600 font-bold text-white px-4 py-2 text-3x1 rounded hover:bg-green-700 transition no-print"
                >
                  IMPRIMIR 
                </button>
              )}
            </div>
            
            <div className="flex flex-row gap-6 mt-3">
              <div className="flex items-center gap-2">
                <input
                  id="showActive"
                  type="checkbox"
                  checked={showActive}
                  onChange={() => {
                    setShowActive(true);
                    setShowInactive(false);
                  }}
                  className={`w-5 h-5 rounded cursor-pointer border border-green-600 ${
                    showActive ? "accent-green-600" : "accent-gray-400"
                  }`}
                />
                <label htmlFor="showActive" className="text-green-700 font-semibold" >
                  Activos
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input id="showInactive" type="checkbox" checked={showInactive} onChange={() => {
                    setShowInactive(true);
                    setShowActive(false);
                  }}
                  className={`w-5 h-5 rounded cursor-pointer border border-red-600 ${
                    showInactive ? "accent-red-600" : "accent-gray-400"
                  }`}
                />
                <label
                  htmlFor="showInactive"
                  className="text-green-700 font-semibold"
                >
                  Inactivos
                </label>
              </div>
            </div>
          </div>

          {/*  búsqueda */}
          <div className="mt-6 flex flex-row flex-wrap gap-4 mb-6">

            <div className="flex-1 min-w-[120px] max-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1"> Nombre </label>
              <input type="text" name="firstName" value={searchParams.firstName} onChange={handleChange} placeholder="Ingrese el nombre"
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div className="flex-1 min-w-[120px] max-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1"> Apellido </label>
              <input type="text" name="lastName" value={searchParams.lastName} onChange={handleChange} placeholder="Ingrese el apellido"
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div className="flex-1 min-w-[120px] max-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1"> Dirección </label>
              <input type="text" name="direccion" value={searchParams.direccion} onChange={handleChange} placeholder="Ingrese la dirección"
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div className="flex-1 min-w-[120px] max-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1"> E-Mail </label>
              <input type="text" name="email" value={searchParams.email} onChange={handleChange} placeholder="Ingrese el E-Mail"
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div className="flex-1 min-w-[120px] max-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1"> Teléfono </label>
              <input type="text" name="phone" value={searchParams.phone} onChange={handleChange} placeholder="Ingrese el teléfono" 
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div className="flex-1 min-w-[120px] max-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1"> Tipo de Cita </label>
              <input type="text" name="consultingType" value={searchParams.consultingType} onChange={handleChange} placeholder="Ingrese el tipo de cita"
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            {/*
            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1"> Fecha de la Cita </label>
              <input type="date" name="fecha" value={searchParams.fecha} onChange={handleChange} placeholder="Ingrese la fecha de cita"
                className="w-full border border-green-600 rounded p-2 text-2x1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            */}

             <div className="flex-1 min-w-[120px] max-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">
                Rango de Fechas
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="fechaInicio"
                  value={searchParams.fechaInicio || ""}
                  onChange={handleChange}
                  className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-green-700 font-bold">-</span>
                <input
                  type="date"
                  name="fechaFin"
                  value={searchParams.fechaFin || ""}
                  onChange={handleChange}
                  className="w-full border border-green-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
           </div>
         </div>
          

         {/* 🔹 Tabla con encabezado impreso */}
          <div ref={tableRef} className="mt-4 border border-green-500 rounded-lg shadow-md overflow-hidden">
            {/* Encabezado solo al imprimir */}
            <div className="print-header hidden print:block">
              <img
                src={currentUser?.company?.logoUrl || "/logo18.png"} // <- logo dinámico
                alt={currentUser?.company?.name || "Logo Cliente"}
              />
              <h2 className="print-title">CITAS REGISTRADAS</h2>
            </div>
            <div className="max-h-[300px] overflow-y-auto" >   
              <table className="min-w-[900px] w-full">
                <thead className="bg-green-600 text-white sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> Nombre </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> Apellido </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> Dirección </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> E-Mail </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> Teléfono </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> Tipo de Cita </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> Fecha de la Cita </th>
                    {isAdmin && (
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase"> Dueño </th>
                    )}
                    <th className="px-6 py-3 text-center text-sm font-semibold uppercase no-print"> Acción </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-green-500">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={isAdmin ? 8 : 7}
                        className="text-center py-4 text-gray-500 italic"
                      >
                        Cargando registros...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={isAdmin ? 8 : 7}
                        className="text-center py-4 text-red-500 font-bold"
                      >
                        Error al cargar los datos: {error}
                      </td>
                    </tr>
                  ) : paginatedAppointments.length > 0 ? (
                    paginatedAppointments.map(a => (
                      <tr
                        key={a.appointmentDtlId}
                        className="hover:bg-gray-200 hover:text-green-800 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800"> {a.firstName} </td>
                        <td className="px-6 py-4 text-sm text-gray-800"> {a.lastName} </td>
                        <td className="px-6 py-4 text-sm text-gray-800"> {a.appointmentAddress?.address} </td>
                        <td className="px-6 py-4 text-sm text-gray-800"> {a.email} </td>
                        <td className="px-6 py-4 text-sm text-gray-800"> {a.phone} </td>
                        <td className="px-6 py-4 text-sm text-gray-800"> {a.consultingType} </td>
                        <td className="px-6 py-4 text-sm text-gray-800">  {formatDateTime(a.consultingDate)} </td>
                        {isAdmin && (
                          <td className="px-6 py-4 text-sm text-gray-800"> {a.userId?.userName} </td>
                        )}
                        <td className="px-4 py-4 text-center no-print">
                          <Link
                            href={`/aplicaciones/persona/${a.appointmentDtlId}`}
                            className="bg-green-600 font-bold text-white px-2 py-1 rounded-md text-sm shadow-md hover:bg-green-700 transition inline-block"
                          >
                            VER MAS
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={isAdmin ? 8 : 7}
                        className="text-center py-4 text-gray-500 italic"
                      >
                        No hay registros disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
          </div>
          
            {/* Barra de paginación */}
            <div className="flex justify-center items-center gap-4 py-3 bg-gray-50 border-t border-green-500 no-print">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                type="button"
                className={`px-4 py-1 rounded-md font-semibold ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                ANTERIOR
              </button>

              <span className="text-green-700 font-bold">
                PAGINA {currentPage} DE {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(p => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                type="button"
                className={`px-4 py-1 rounded-md font-semibold ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                SIGUIENTE
              </button>
            </div>
          </div>
        </form>
      </div>
    </ScaleIn>
  );
}
