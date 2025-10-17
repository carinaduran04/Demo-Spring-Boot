"use client";
import React, { useEffect, useState } from "react";

interface ModalAlertProps {
  isOpen: boolean;
  message: string;
  onOk?: (() => void | Promise<void>) | null;
  onCancel?: (() => void | Promise<void>) | null;
  onClose?: () => void;
}

export default function ModalAlert({
  isOpen,
  message,
  onOk = null,
  onCancel = null,
  onClose = () => {},
}: ModalAlertProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isConfirm = Boolean(onCancel && typeof onCancel === "function");

  const handleOk = async () => {
    if (loading) return;
    if (!onOk) return onClose();  

    setLoading(true);
    try {
      await onOk();
    } catch (err) {
      console.error("Error en onOk:", err);
    } finally {
      setLoading(false);
      onClose(); 
    }
  };
  
  const handleCancel = async () => {
  if (loading) return;
  if (!onCancel) return onClose();

  setLoading(true);
  try {
    await onCancel();
  } catch (err) {
    console.error("Error en onCancel:", err);
  } finally {
    setLoading(false);
    onClose(); 
  }
};

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!isConfirm) onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"  
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-green-700 mb-3">DRTG</h3>
        <p className="text-red-600 text-base mb-5">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleOk}
            disabled={loading}
            className={`px-4 py-2 rounded font-bold text-white ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "..." : isConfirm ? "SÍ" : "OK"}
          </button>
          {isConfirm && (
            <button
              onClick={handleCancel}
              disabled={loading}
              className={`px-4 py-2 rounded font-bold text-white ${
                loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "..." : "NO"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
