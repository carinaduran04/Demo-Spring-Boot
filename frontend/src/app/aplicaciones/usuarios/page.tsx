"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ScaleIn from "@/components/scaleIn";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

interface Usuario {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  company: string;
  userTypeId: number;
  role: string;
  status: string;
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
  const [searchParams, setSearchParams] = useState<SearchParams>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    userTypeId: "",
    status: "ACTIVE",
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
        .max-h-[400px] { max-height: none !important; }
        .overflow-y-auto { overflow: visible !important; }
        table { width: 100% !important; min-width: auto !important; border-collapse: collapse; }
        th, td { padding: 4px !important; font-size: 10px !important; border: 1px solid #000; }
        .print-title {
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
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

    const filtered = allUsers.filter(u =>
      (!searchParams.firstName || u.firstName?.toLowerCase().startsWith(searchParams.firstName.toLowerCase())) &&
      (!searchParams.lastName || u.lastName?.toLowerCase().startsWith(searchParams.lastName.toLowerCase())) &&
      (!searchParams.email || u.email?.toLowerCase().startsWith(searchParams.email.toLowerCase())) &&
      (!searchParams.company || u.company?.toLowerCase().startsWith(searchParams.company.toLowerCase())) &&
      (!searchParams.userTypeId || u.userTypeId.toString() === searchParams.userTypeId) &&
      (!searchParams.status || u.status?.toLowerCase() === searchParams.status.toLowerCase())
    );

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
      case 2: return "LOAN";
      case 3: return "MED";
      case 4: return "SALES";
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
          <h2 className="text-3xl text-green-700 font-semibold text-center mb-4">
             USUARIOS REGISTRADOS
          </h2>

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
                <option value="1">ADMIN</option>
                <option value="2">LOAN</option>
                <option value="3">MED</option>
                <option value="4">SALES</option>
              </select>
            </div>
           </div>
          
          <div className="flex justify-end gap-4 mb-3">
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

          {/* Tabla */}
          <div ref={tableRef} className="mt-4 border border-green-500 rounded-lg shadow-md overflow-hidden p-2">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-[700px] w-full">
                <thead className="bg-green-600 text-white sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Usuario</th>
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
                        <td className="px-6 py-3 text-sm text-gray-800">{u.userName}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.firstName}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.lastName}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.email}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{u.company}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{userTypeName(u.userTypeId)}</td>
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
