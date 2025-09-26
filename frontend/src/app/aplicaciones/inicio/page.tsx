"use client";
import Link from "next/link";
import Image from "next/image";
import { FaWpforms, FaSearch } from "react-icons/fa";
import ScaleIn from "@/components/scaleIn";

export default function SolicitudPrestamo() {
 
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <ScaleIn>
   <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">

      <section className="text-center p-4">
        <div>
           <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
          Bienvenido a DRTG CLOUD TECHNOLOGY
        </h1>

        </div>
 
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
      </section>
    </div>
    </ScaleIn>
  );
}
