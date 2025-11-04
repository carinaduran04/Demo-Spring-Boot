"use client";

import { ReactNode, useEffect } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalWrapper({ isOpen, onClose, children }: ModalWrapperProps) {
  // Cierra al presionar "ESC"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      onClick={onClose} // cierra al hacer click fuera del contenido
    >
      <div
        className="relative bg-gray-100 border-2 border-green-600 rounded-2xl shadow-2xl max-w-6xl w-[95%] max-h-[95vh] overflow-y-auto p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-8 h-8 text-sm font-bold hover:bg-red-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
