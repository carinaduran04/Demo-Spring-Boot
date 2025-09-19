"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";

export default function Login() {
  const [tab, setTab] = useState<"personal" | "empresarial">("personal");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const users = {
    personal: { u: "Jose", p: "1234", fn: "Jose Luis", go: "/aplicaciones" },
    empresarial: { u: "david", p: "abcd", fn: "David Parra", go: "/aplicaciones" },
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = users[tab];
    if (user === valid.u && pass === valid.p) {
      router.push(valid.go);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 shadow-md rounded-md w-[350px] p-6 h-[600px] flex flex-col justify-between">
        
        <div className="flex justify-center px-4">
          <Image
            src="/logo15.png"
               
            alt="Logo"
            width={90}
            height={90}
            className="w-2/4 "
          />
        </div> 

        <div className="flex mb-4">
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

        <form onSubmit={submit} className="space-y-4">
          <div className="flex items-center gap-2">
            <FaUser />
            <input
              className="flex-1 border px-2 py-1 rounded"
              placeholder="Usuario"
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

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <hr className="border-gray-300 my-2" />

        <div className="text-center text-sm space-y-1">
          <a href="#" className="text-lg text-green-600 font-semibold">
            Registrarme en DRTG
          </a>
        </div>

        <hr className="border-gray-300 my-2" />

        <div className="flex flex-col items-center gap-4 text-green-600 text-lg">
          <div className="flex gap-5">
            <FaFacebook className="text-4xl" />
            <FaInstagram className="text-4xl" />
            <FaTwitter className="text-4xl" />
            <FaYoutube className="text-4xl" />
          </div>
          <p className="text-black text-base">
            Síguenos en nuestras redes sociales
          </p>
        </div>
      </div>
    </div>
  );
}
