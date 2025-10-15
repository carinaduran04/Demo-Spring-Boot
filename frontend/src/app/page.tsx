"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (user) {
      router.push("/aplicaciones/inicio");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
