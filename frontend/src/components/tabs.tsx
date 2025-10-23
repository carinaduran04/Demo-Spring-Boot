"use client";

import { useState } from "react";

const tabs = [
  { id: "persona", label: "Informacion personal" },
  { id: "contactos", label: "Contactos" },
  { id: "doctor", label: "Doctor" },
  { id: "mensaje", label: "Mensaje " },
  { id: "consulta", label: "Consulta" }, 

];

export default function Tabs({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [active, setActive] = useState("persona");

  const handleTabClick = (id: string) => {
    setActive(id);
    onTabChange(id);
  };

  return (
    <div className="border-b border-gray-300 mb-4 flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-3 py-2 text-sm font-medium ${
            active === tab.id
              ? "border-b-2 border-green-600 text-green-700"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
