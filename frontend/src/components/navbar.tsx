'use client';

import Link from "next/link";
import { FaWpforms, FaUser } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const logos = ["/logo2.png", "/logo3.png", "/logo4.png", "/logo6.jpg", "/logo5.png"];
  const [logoActivo, setLogoActivo] = useState(logos[0]);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-green-600 text-white font-semibold px-6 py-3 shadow-md w-full">
        <div className="relative flex items-center justify-center">
          <div className="absolute left-6">
            <div
              className="cursor-pointer"
              onClick={() => setMostrarOpciones(!mostrarOpciones)}
            >
              <Image src={logoActivo} alt="Logo activo" width={70} height={70} />
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

          <ul className="flex space-x-8 items-center">
            <li>
              <Link href="/aplicaciones/agregar" className="flex items-center gap-2">
                <FaWpforms className="text-lg" />
                Formulario
              </Link>
            </li>
            <li>
              <Link href="/aplicaciones/consulta" className="flex items-center gap-2">
                <FaUser className="text-lg" />
                Buscar
              </Link>
            </li>
            
          </ul>
        </div>
      </nav>
    </div>
  );
}
