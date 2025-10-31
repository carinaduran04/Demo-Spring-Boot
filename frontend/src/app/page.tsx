"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // Redirige al login al abrir la raíz
  }, [router]);

  return null;
}
