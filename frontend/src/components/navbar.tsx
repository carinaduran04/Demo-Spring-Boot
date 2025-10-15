"use client";

import Link from "next/link";
import { FaWpforms, FaUser, FaHome } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const logos = [
    "/logo18.png",
    "/logo16.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo6.jpg",
    "/logo5.png",
  ];
  const [logoActivo, setLogoActivo] = useState(logos[0]);
const [mostrarOpciones, setMostrarOpciones] = useState(false);
const [userName, setUserName] = useState("");
 const pathname = usePathname();

  const disabledPages = [
    "/aplicaciones/haz_consulta",
    "/aplicaciones/persona",
  ];

  const isDisabled = disabledPages.some((page) =>
    pathname.startsWith(page)
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.fullName || parsed.userName);
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
            <div
              className="cursor-pointer"
              onClick={() => setMostrarOpciones(!mostrarOpciones)}
            >
              <Image src={logoActivo} alt="Logo activo" width={50} height={50} />
            </div>
            <div className="h-[3rem] w-[.2rem] bg-white rounded-[1.5rem]"></div>

            <div className="flex flex-col items-start">
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
              <p className="text-xs text-white opacity-90">
                Pembroke Pines Florida 33025
              </p>
            </div>

            {mostrarOpciones && (
              <div className="absolute top-14 left-0 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2 z-50">
                {logos.map((logo, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setLogoActivo(logo);
                      setMostrarOpciones(false);
                    }}
                    className="hover:bg-gray-100 rounded p-1"
                  >
                    <Image src={logo} alt={`Logo ${i + 1}`} width={40} height={40} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <ul className="flex space-x-4 items-center text-white text-sm font-bold">
            {[
              {
                href: "/aplicaciones/inicio",
                icon: <FaHome className="text-lg" />,
                label: "Inicio",
              },
              {
                href: "/aplicaciones/consulta",
                icon: <FaUser className="text-lg" />,
                label: "Buscar",
              },
              {
                href: "/aplicaciones/haz_consulta",
                icon: <FaWpforms className="text-lg" />,
                label: "Crear Citas",
              },
            ].map((item, idx) => (
              <li key={idx} className="px-3 border-r border-white last:border-0">
                <Link
                  href={item.href}
                  className="flex items-center gap-2 bg-white text-green-600 px-3 py-1.5 text-sm rounded-lg border-2 border-white transition-all duration-200 hover:bg-green-800 hover:text-white"
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

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
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
