"use client";

import Link from "next/link";
import { FaWpforms, FaUser, FaHome, FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [logoActivo, setLogoActivo] = useState("/logo18.png"); // logo por defecto
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userText, setUserText] = useState<{ line1: string }>({ line1: "" });

  const pathname = usePathname();

  const disabledPages = [
    "/aplicaciones/haz_consulta",
    "/aplicaciones/persona",
    "/aplicaciones/crear_usuario",
    "/aplicaciones/usu",
  ];
  const isOnDisabledPage = disabledPages.some((page) =>
    pathname.startsWith(page)
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setCurrentUser(parsed);
      setUserName(parsed.fullName || parsed.userName);
      setAddress(parsed.address || "Dirección no disponible");

      const email = parsed.username?.toLowerCase() || "";

      // 🔹 Aquí se define qué logo y texto mostrar según el usuario
      if (parsed.role === "admin") {
        setLogoActivo("/logo18.png");
        setUserText({ line1: "Bienvenido a la plataforma" });
      } else if (email.includes("eddy")) {
        setLogoActivo("/eddylo.png");
        setUserText({ line1: "ARQUITECTO EDDY LOPEZ" });
      } else if (email.includes("caro")) {
        setLogoActivo("/carooo.png");
        setUserText({ line1: "CAROLINA VENDE" });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName("");
    window.location.href = "/login";
  };

  return (
    <div className="top-0 left-0 right-0 z-40">
      <nav className="bg-green-600 text-white font-semibold px-14 py-2 shadow-md w-full">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <Image src={logoActivo} alt="Logo activo" width={60} height={60} />
            <div className="h-[3rem] w-[.2rem] bg-white rounded-[1.5rem]"></div>

            {/* Texto según tipo de usuario */}
            <div className="flex flex-col items-start">
              {currentUser?.role === "admin" ? (
                <h1 className="text-[1.5rem] font-semibold text-white group inline-flex text-2xl">
                  <span>DRT</span>
                  <span className="overflow-hidden transition-all duration-500 group-hover:w-[3ch] w-0">
                    <span className="inline-block">ech</span>
                  </span>
                  <span>G</span>
                  <span className="overflow-hidden transition-all duration-500 group-hover:w-[4ch] w-0">
                    <span className="inline-block">roup</span>
                  </span>
                </h1>
              ) : (
                <>
                  <p className="text-white text-base font-semibold">{userText.line1}</p>
                </>
              )}

              {/* Dirección */}
              <p className="text-xs text-white opacity-90">{address}</p>
            </div>
          </div>

          {/* Menú de navegación */}
          <ul className="flex space-x-4 items-center text-white text-sm font-bold">
            <li className="px-3 border-r border-white last:border-0">
              <Link
                href="/aplicaciones/inicio"
                onClick={(e) => isOnDisabledPage && e.preventDefault()}
                className="flex items-center gap-2 bg-white text-green-600 px-3 py-1.5 text-sm rounded-lg border-2 border-white transition-all duration-200 hover:bg-green-800 hover:text-white"
              >
                <FaHome className="text-lg font-bold" />
                INICIO
              </Link>
            </li>

            <li className="px-3 border-r border-white last:border-0">
              <Link
                href="/aplicaciones/consulta"
                onClick={(e) => isOnDisabledPage && e.preventDefault()}
                className="flex items-center gap-2 bg-white text-green-600 px-3 py-1.5 text-sm rounded-lg border-2 border-white transition-all duration-200 hover:bg-green-800 hover:text-white"
              >
                <FaUser className="text-lg font-bold" />
                BUSCAR
              </Link>
            </li>

            <li className="px-3 border-r border-white last:border-0">
              <Link
                href="/aplicaciones/haz_consulta"
                onClick={(e) => isOnDisabledPage && e.preventDefault()}
                className="flex items-center gap-2 bg-white text-green-600 px-3 py-1.5 text-sm rounded-lg border-2 border-white transition-all duration-200 hover:bg-green-800 hover:text-white"
              >
                <FaWpforms className="text-lg font-bold" />
                CREAR CITA
              </Link>
            </li>
  

            {/* Solo visible si el usuario es admin */}
            {currentUser?.role === "admin" && (
              <li className="px-3 border-r border-white last:border-0">
                <Link
                  href="/aplicaciones/mantenimiento"
                  onClick={(e) => isOnDisabledPage && e.preventDefault()}
                  className="flex items-center gap-2 bg-white text-green-600 px-3 py-1.5 text-sm rounded-lg border-2 border-white transition-all duration-200 hover:bg-green-800 hover:text-white"
                >
                  <FaUserPlus className="text-lg font-bold" />
                  MANTENIMIENTO USUARIOS
                </Link>
              </li>
            )}
          </ul>

          {/* Info usuario */}
          <div className="flex items-center gap-4">
            {userName ? (
              <>
                <div className="flex flex-col text-white text-sm">
                  <span className="font-bold">Bienvenido, 👤 {userName}</span>
                  <span className="text-xs">
                    Último acceso:{" "}
                    {new Date().toLocaleString("es-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-white hover:bg-green-700 hover:text-white p-2 rounded-full border-2 border-white text-green-700 flex items-center justify-center shadow-md"
                  title="Cerrar sesión"
                >
                  ⏻
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-white text-green-600 px-3 py-1 rounded text-sm font-bold"
              />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
