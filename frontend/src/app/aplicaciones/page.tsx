"use client";
import Link from "next/link";
import Image from "next/image";
import { FaWpforms, FaSearch } from "react-icons/fa";

export default function SolicitudPrestamo() {
 
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <section className="text-center p-4">

            <div className="mb-5 flex justify-center">
          <Link href="/" >
            <Image
              src="/logo13.png"
              alt="Logo de la aplicación"
              width={320}
              height={120}
              className="rounded-md shadow-md cursor-pointer"
            />
          </Link>
        
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
          Bienvenido a DRTG CLOUD TECHNOLOGY
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
          Aquí puedes navegar al formulario o buscar información.
        </p>

      <div className="flex gap-6 justify-center">

      <Link
        href="/aplicaciones/agregar"
        className="flex flex-col items-center justify-center w-32 h-32 bg-white border border-green-600 text-green-600 rounded-xl shadow-md hover:bg-green-50 transition"
      >
        <FaWpforms className="w-10 h-10 mb-2 text-green-600" />
        <span className="font-semibold">Formulario</span>
      </Link>

      <Link
        href="/aplicaciones/consulta"
        className="flex flex-col items-center justify-center w-32 h-32 bg-white border border-green-600 text-green-600 rounded-xl shadow-md hover:bg-green-50 transition"
      >
        <FaSearch className="w-10 h-10 mb-2 text-green-600" />
        <span className="font-semibold">Buscar</span>
      </Link>
    </div>
      </section>
    </div>
  );
}
