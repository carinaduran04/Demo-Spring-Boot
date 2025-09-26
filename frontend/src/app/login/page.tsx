"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import FooterPage from "@/components/footer"; 


interface User {
  userId: number;
  userName: string;
  password: string;
  fullName?: string;
}

export default function Login() {
  const [tab, setTab] = useState<"personal" | "empresarial">("personal");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/user/all");
      const raw = await res.json();
      console.log("📌 Respuesta de la API:", raw);

      const data: User[] = Array.isArray(raw)
        ? raw
        : raw.users || raw.content || [];

      if (!Array.isArray(data)) {
        setError("La API no devolvió usuarios en formato válido");
        return;
      }

      const mappedUsers = data.map((u: User) => ({
        id: u.userId,
        name: u.userName.trim().toLowerCase(),
        pass: u.password.trim(),
        fullName: u.fullName ?? u.userName,
      }));

      const validUser = mappedUsers.find(
        (u) => u.name === user.trim().toLowerCase() && u.pass === pass.trim()
      );

      if (validUser) {
        localStorage.setItem("user", JSON.stringify(validUser));

        if (validUser.id === 1) {
          router.push("/aplicaciones/inicio");
        } else if (validUser.id === 2 || validUser.id === 3) {
          router.push("/aplicaciones/consulta");
        } else {
          router.push("/aplicaciones");
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con la API");
      console.error(err);
    }
  };

  return (
    <div className="relative bg-white flex flex-col  items-center  max-h-[93vh] h-screen  ">

  <div className="w-full px-8 pt-2 relative">
    <div className="flex items-center">

      <Image src="/logo16.png" alt="Logo" width={150} height={80} />

      <div className="flex-1 border-t-4 border-green-500 ml-2 relative ">
        <span className="absolute -top-9 right-0 bg-green-450 text-green-800 text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
          {new Date().toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
  
  <div className="bg-gray-200 shadow-md rounded-md w-[350px] max-h-[90vh] p-8 flex flex-col justify-between overflow-hidden ">
    <div className="flex justify-center px-4  ">
      <Image src="/logo15.png" alt="Logo" width={90} height={90} className="w-2/4" />
    </div> 

    <div className="flex mb-4  mt-2">
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

      <button className="w-full bg-green-600 text-white py-2 rounded ">
        Iniciar Sesión
      </button>

      {error && <p className="text-red-600 text-center text-sm">{error}</p>}
    </form>

    <hr className="border-gray-400 my-2 mt-8" />
   

    <div className="flex flex-col items-center gap-6 text-green-600 text-lg mt-4">
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
  
  <div className="fixed bottom-0 w-full z-22">
    <FooterPage />
  </div>
</div>

  );
}
