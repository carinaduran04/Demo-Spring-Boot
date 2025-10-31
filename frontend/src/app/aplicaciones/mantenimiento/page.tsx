"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ScaleIn from "@/components/scaleIn";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

interface Company {
  companyId: number;
  name: string;
  logoUrl?: string;
}

interface AppointmentUserType {
  userTypeId: number;
  name: string;
}

interface Usuario {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  company?: Company; 
  appointmentUserType?: AppointmentUserType;
  role: string;
  status?: string;  
  createDate: string;
}

interface SearchParams {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  userTypeId: string;
  status: string;
}

export default function BuscarUsuarios() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<Usuario[]>([]);
  const [users, setUsers] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showActive, setShowActive] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    userTypeId: "",
    status: "",
  });

  const rowsPerPage = 8;
  const tableRef = useRef<HTMLTableElement>(null);

const handlePrint = useReactToPrint({
  contentRef: tableRef,
  documentTitle: "Usuarios registrados",
  pageStyle: `
   @media print {
        body { font-size: 10px; }
        .no-print { display: none !important; }

        table { width: 100% !important; border-collapse: collapse; }
        th, td { padding: 4px !important; font-size: 10px !important; border: 1px solid #000; }

        /* Column headers en verde */
        th { color: green !important; }

        /* Título principal en verde */
        .print-title { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 10px; color: green !important; }
      }
    `,
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/appointmentuser/all");
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const data: Usuario[] = await res.json();
        setAllUsers(data);
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar usuarios.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filtered = allUsers.filter((u) => {
      const nameMatch =
        !searchParams.firstName ||
        (u.firstName && u.firstName.toLowerCase().includes(searchParams.firstName.toLowerCase()));
      const lastNameMatch =
        !searchParams.lastName ||
        (u.lastName && u.lastName.toLowerCase().includes(searchParams.lastName.toLowerCase()));
      const emailMatch =
        !searchParams.email ||
        (u.email && u.email.toLowerCase().includes(searchParams.email.toLowerCase()));
      const companyMatch =
        !searchParams.company ||
        (u.company?.name && u.company.name.toLowerCase().includes(searchParams.company.toLowerCase()));
      const userTypeMatch =
        !searchParams.userTypeId ||
        (u.appointmentUserType?.name && u.appointmentUserType.name.toLowerCase() === searchParams.userTypeId.toLowerCase());
     
        let statusMatch = true;
      const status = u.status?.toLowerCase();

      if (showActive && !showInactive) statusMatch = status === "active";
      else if (!showActive && showInactive) statusMatch = status === "inactive";
      else if (showActive && showInactive) statusMatch = status === "active" || status === "inactive";
  
        return (
        nameMatch &&
        lastNameMatch &&
        emailMatch &&
        companyMatch &&
        userTypeMatch &&
        statusMatch
      );
    });

    setUsers(filtered);
    setCurrentPage(1);
  };

  // Paginación
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

const userTypeName = (id: number) => {
  switch (id) {
    case 1: return "ADMIN";
    case 2: return "CLIENT";
    default: return "N/A";
  }
};


  const handleClick = () => {
    router.push("/aplicaciones/crear_usuario"); 
  };

  return (
    <ScaleIn>
      <div className="flex justify-center py-1 pt-8 px- p-35">
        <form
          onSubmit={handleSearch}
          className="bg-gray-100 border border-green-600 p-8 rounded-xl shadow-md w-full max-w-8xl flex flex-col min-h-[70vh]"
        >
          <h2 className="print-title text-3xl text-green-700 font-semibold text-center mb-4">
             USUARIOS REGISTRADOS
          </h2>

               <div className="flex justify-end gap-4 mb-2">
            <button
              type="submit"
              className="bg-green-600 font-bold text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              BUSCAR
            </button>

             <button
                type="button" 
                className="bg-green-600 font-bold text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={handleClick}
                >
                CREAR USUARIO 
                </button>
            {users.length > 0 && (
              <button
                type="button"
                onClick={handlePrint}
                className="bg-green-600 font-bold text-white px-4 py-2 rounded hover:bg-green-700 transition no-print"
              >
                IMPRIMIR
              </button>
            )}
          </div>

          <div className="flex justify-end gap-6 mt-3">
                <div className="flex items-center gap-2 ">
                  <input
                    id="showActive"
                    type="checkbox"
                    checked={showActive}
                    onChange={() => {
                      setShowActive(prev => !prev);
                      if (showInactive && !showActive) setShowInactive(false); // evita ambos marcados
                    }}
                    className={`w-5 h-5 rounded cursor-pointer border border-green-600 ${
                      showActive ? "accent-green-600" : "accent-gray-400"
                    }`}
                  />
                  <label htmlFor="showActive" className="text-green-700 font-semibold">
                    Activos
                  </label>
                </div>
                <div className="flex items-center gap-2 ">
                  <input
                    id="showInactive"
                    type="checkbox"
                    checked={showInactive}
                    onChange={() => {
                      setShowInactive(prev => !prev);
                      if (showActive && !showInactive) setShowActive(false); // evita ambos marcados
                    }}
                    className={`w-5 h-5 rounded cursor-pointer border border-red-600 ${
                      showInactive ? "accent-red-600" : "accent-gray-400"
                    }`}
                  />
                  <label htmlFor="showInactive" className="text-green-700 font-semibold">
                    Inactivos
                  </label>
                </div>
              </div>

          {/* Filtros */}
          <div className="mt-6 flex flex-row flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[100px]">
              <label className="block text-base text-green-700 font-bold mb-1">Nombre</label>
              <input
                name="firstName"
                value={searchParams.firstName}
                onChange={handleChange}
                placeholder="Ingrese nombre"
                className="w-full border border-green-600 rounded p-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Apellido</label>
              <input
                name="lastName"
                value={searchParams.lastName}
                onChange={handleChange}
                placeholder="Ingrese apellido"
                className="w-full border border-green-600 rounded p-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Correo</label>
              <input
                name="email"
                value={searchParams.email}
                onChange={handleChange}
                placeholder="Ingrese correo"
                className="w-full border border-green-600 rounded p-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Compañía</label>
              <input
                name="company"
                value={searchParams.company}
                onChange={handleChange}
                placeholder="Ingrese compañía"
                className="w-full border border-green-600 rounded p-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          <div className="flex-1 min-w-[200px]">
              <label className="block text-base text-green-700 font-bold mb-1">Tipo de Usuario</label>
              <select
                name="userTypeId"
                value={searchParams.userTypeId}
                onChange={handleChange}
                className="w-full border border-green-600 rounded p-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="admin">ADMIN</option>
                <option value="client">CLIENT</option>
              </select>
            </div>
           </div>

          {/* Tabla */}
          <div ref={tableRef} className="mt-4 border border-green-500 rounded-lg shadow-md overflow-hidden p-2">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-[700px] w-full">
                <thead className="bg-green-600 text-white sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Apellido</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Correo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Compañía</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Tipo</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold uppercase no-print">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-500">
                  {isLoading ? (
                    <tr><td colSpan={8} className="text-center py-4 text-gray-500 italic">Cargando...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={8} className="text-center py-4 text-red-500 font-bold">{error}</td></tr>
                  ) : paginatedUsers.length > 0 ? (
                    paginatedUsers.map(u => (
                      <tr key={u.userId} className="hover:bg-gray-200 transition">
                        <td className="px-6 py-3 text-sm text-gray-800">{u.firstName}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.lastName}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.email}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.company?.name}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.appointmentUserType?.name}</td>
                        <td className="px-4 py-3 text-center no-print">
                          <Link
                            href={`/aplicaciones/usu/${u.userId}`}
                            className="bg-green-600 font-bold text-white px-2 py-1 rounded text-sm hover:bg-green-700 transition"
                          >
                            VER MÁS
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={8} className="text-center py-4 text-gray-500 italic">No hay usuarios registrados</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 py-3 bg-gray-50 border-t border-green-500 no-print">
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-1 rounded-md font-semibold ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                ANTERIOR
              </button>
              <span className="text-green-700 font-bold">
                PÁGINA {currentPage} DE {totalPages || 1}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
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
