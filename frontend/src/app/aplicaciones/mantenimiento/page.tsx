"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ScaleIn from "@/components/scaleIn";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import ModalWrapper from "@/components/ModalWrapper";
import UsuarioVerMas from "@/components/UsuarioVerMas";


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
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ userName?: string } | null>(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error al parsear usuario:", e);
        }
      }
    }
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: tableRef,
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

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/appointmentuser/all");
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const data: Usuario[] = await res.json();
      setAllUsers(data);
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuarios.");
    } finally {
      setIsLoading(false);
    }
  };

  // cargar usuarios al iniciar
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers.filter((u) => {
      const status = u.status?.toLowerCase();
      if (showActive && !showInactive) return status === "active";
      if (!showActive && showInactive) return status === "inactive";
      if (showActive && showInactive) return true;
      return true;
    });
    setUsers(filtered);
    setCurrentPage(1);
  }, [showActive, showInactive, allUsers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
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
        (u.appointmentUserType?.name &&
          u.appointmentUserType.name.toLowerCase() === searchParams.userTypeId.toLowerCase());

      let statusMatch = true;
      const status = u.status?.toLowerCase();
      if (showActive && !showInactive) statusMatch = status === "active";
      else if (!showActive && showInactive) statusMatch = status === "inactive";
      else if (showActive && showInactive) statusMatch = status === "active" || status === "inactive";

      return nameMatch && lastNameMatch && emailMatch && companyMatch && userTypeMatch && statusMatch;
    });

    setUsers(filtered);
    setCurrentPage(1);
  };

  // Paginación
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleClick = () => {
    router.push("/aplicaciones/crear_usuario");
  };

  const handleOpenUserModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowUserModal(true);
  };

  const handleCloseModal = async () => {
    setShowUserModal(false);
    await fetchUsers(); 
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
              <label htmlFor="showActive" className="text-green-700 font-semibold">
                Activos
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="showInactive"
                type="checkbox"
                checked={showInactive}
                onChange={() => {
                  setShowInactive(true);
                  setShowActive(false);
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

 
          <div ref={tableRef} className="mt-4 border border-green-500 rounded-lg shadow-md overflow-hidden">
            {/* Encabezado solo al imprimir */}
           <div className="print-header hidden print:block text-center">
              <img
                src="/logo18.png"
                alt="Logo de la empresa"
                className="mx-auto mb-2"
                style={{ width: "80px", height: "auto" }}
              />
              <h2 className="print-title">CITAS REGISTRADAS</h2>
              <div className="print-info text-sm text-gray-700">
                Impreso por: <strong>{currentUser?.userName || "Usuario desconocido"}</strong><br />
                Fecha: {new Date().toLocaleString("es-DO")}
              </div>
            </div>
                <div
                  style={{
                    borderTop: "2px solid #22c55e",
                    margin: "10px 0",
                  }}
                ></div>
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
                         <button
                            onClick={() => handleOpenUserModal(u.userId)}
                            className="bg-green-600 font-bold text-white px-2 py-1 rounded text-sm hover:bg-green-700 transition"
                            type="button"
                          >
                            VER MÁS
                          </button>
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
        <ModalWrapper isOpen={showUserModal} onClose={handleCloseModal}>
          {selectedUserId && <UsuarioVerMas id={selectedUserId} />}
        </ModalWrapper>
      </div>
    </ScaleIn>
  );
}
