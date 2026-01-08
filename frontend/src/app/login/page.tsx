"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import FooterPage from "@/components/footer";
import Link from "next/link";

interface User {
  userId: number;
  userName: string;
  email: string;
  password: string;
  userTypeId: number;
  fullName?: string;
  address?: any;
  status?: string;  
}

export default function Login() {
  const [tab, setTab] = useState<"personal" | "empresarial">("personal");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/appointmentuser/all");
      const raw = await res.json();
      console.log("Respuesta de la API:", raw);

      const data: User[] = Array.isArray(raw)
        ? raw
        : raw.users || raw.content || [];

      if (!Array.isArray(data)) {
        setError("La API no devolvió usuarios en formato válido");
        return;
      }

      // IDs de administradores
      const adminIds = [1, 6, 7, 8];

      const mappedUsers = data.map((u: User) => {
        const addr =
          typeof u.address === "object" && u.address !== null
            ? u.address.address || u.address.city || "Dirección no disponible"
            : u.address ?? "Dirección no disponible";

        return {
          id: u.userId,
          name: u.email?.trim().toLowerCase(),
          pass: u.password?.trim(),
          fullName: u.fullName ?? u.userName,
          userTypeId: u.userTypeId || 99,
          role: adminIds.includes(u.userId) ? "admin" : "user",
          address: addr,
          active: u.status?.toUpperCase() === "ACTIVE", 
        };
      });

      const validUser = mappedUsers.find(
        (u) => u.name === user.trim().toLowerCase() && u.pass === pass.trim()
      );

      if (!validUser) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      // Validar si el usuario está activo
      if (!validUser.active) {
        setError("Usuario inactivo. Contacte al administrador.");
        return;
      }

      // Validar pestaña correcta
      if (validUser.role === "admin" && tab !== "empresarial") {
        setError("Los administradores deben ingresar por 'Empresarial'.");
        return;
      }

      if (validUser.role === "user" && tab !== "personal") {
        setError("Los usuarios deben ingresar por 'Personal'.");
        return;
      }

      console.log("Usuario logueado:", validUser);
     
      // Guardar datos del usuario
     const originalUser = data.find(u => u.userId === validUser.id);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: validUser.id,
          username: validUser.name,
          userName: validUser.fullName || validUser.name,
          fullName: validUser.fullName,
          role: validUser.role,
          address: originalUser?.address || null,
          userTypeId: validUser.userTypeId,
          active: validUser.active,
        })
      );
      sessionStorage.setItem("session", "active");
    }

      // Redirigir según tipo de usuario
    if (validUser.role === "admin") {
        router.push("/aplicaciones/inicio");
      } else {
        router.push("/aplicaciones/consulta");
      }
    } catch (err) {
      setError("Error al conectar con la API");
      console.error(err);
    }
  };

  return (
    <div className="relative bg-white flex flex-col items-center min-h-screen">
      <div className="w-full px-8 pt-2 relative">
        <div className="flex items-center">
          <Image src="/logo16.png" alt="Logo" width={140} height={80} />

          <div className="flex-1 relative ml-4">
            <h1 className="inline-flex text-[1.5rem] font-semibold text-green-700 group text-2xl relative z-10 bg-white pr-2">
              <span>DRT</span>
              <span className="overflow-hidden transition-all duration-500 group-hover:w-[3ch] w-0">
                <span className="inline-block">ech</span>
              </span>
              <span>G</span>
              <span className="overflow-hidden transition-all duration-500 group-hover:w-[4ch] w-0">
                <span className="inline-block">roup</span>
              </span>
            </h1>
            <p className="text-xs text-green-800 opacity-90">
              Pembroke Pines Florida 33025
            </p>

            <div className="relative">
              <div className="absolute left-0 right-0 top-full mt-1 border-t-4 border-green-400"></div>

              <div className="absolute -top-12 right-0 bg-green-450 text-green-800 text-xs font-semibold px-3 py-1 rounded-lg shadow-md flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold">Fecha:</span>
                  <span>
                    {new Date().toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-bold">Hora:</span>
                  <span>
                    {new Date().toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 shadow-md rounded-md w-[330px] max-h-[89vh] p-8 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-center px-4">
          <Image src="/logo16.png" alt="Logo" width={80} height={80} className="w-2/4" />
        </div>

        <div className="flex mb-4 mt-2">
          {(["personal", "empresarial"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 font-semibold ${
                tab === t ? "bg-green-600 text-white" : "bg-gray-400 text-white"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <FaUser />
            <input
              className="flex-1 border px-2 py-1 rounded"
              placeholder="Email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <FaLock />
            <input
              type="password"
              className="flex-1 border px-2 py-1 rounded"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Iniciar Sesión
          </button>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        </form>

        <hr className="border-gray-400 my-2 mt-3" />
        <div className="flex flex-col gap-2 text-center mt-2">
          <Link href="/login/clave" className="text-black hover:underline cursor-pointer">
            Olvidé mi Clave
          </Link>

          <Link href="/login/contrasena" className="text-black hover:underline cursor-pointer">
            Cambiar mi Contraseña
          </Link>
        </div>
        <hr className="border-gray-400 my-2 mt-3" />

        <div className="flex flex-col items-center gap-4 text-green-600 text-lg mt-0">
          <div className="flex gap-3">
            <FaFacebook className="text-4xl" />
            <FaInstagram className="text-4xl" />
            <FaTwitter className="text-4xl" />
            <FaYoutube className="text-4xl" />
          </div>
          <p className="text-black text-base mt-0">
            Síguenos en nuestras redes sociales
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 w-full z-22">
        <FooterPage />
      </div>
    </div>
  );
}
