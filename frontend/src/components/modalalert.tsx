"use client";

import React, { useEffect } from "react";

interface ModalAlertProps {
  isOpen: boolean;
  message: string;
  onOk?: (() => void) | null;
  onCancel?: (() => void) | null;
  onClose?: () => void;
}

export default function ModalAlert({
  isOpen,
  message,
  onOk = null,
  onCancel = null,
  onClose = () => {},
}: ModalAlertProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    console.log("Cerrando modal desde ModalAlert");
    onClose();
  };

  const handleOk = () => {
   console.log("Click en OK/SÍ");
   if (onOk) onOk(); 
   handleClose();
  };

  const handleCancel = () => {
   console.log("Click en NO/Cancelar");
   if (onCancel) onCancel(); 
  handleClose(); 
 };

  const isConfirm = onCancel !== null;

  const handleOverlayClick = isConfirm ? (e: React.MouseEvent) => {
    console.log("Click fuera ignorado (confirm)");
    e.stopPropagation();
  } : (e: React.MouseEvent) => {
    console.log("Click fuera: cerrando (alert simple)");
    handleClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={handleOverlayClick} 
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <h3
          style={{
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#281313ff",
            fontSize: "1.2rem",
          }}
        >
          DRTG
        </h3>

        <p
          style={{
            color: "red",
            fontSize: "1rem",
            marginBottom: "1.5rem",
            lineHeight: "1.4",
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={handleOk}
            style={{
              backgroundColor: "#22c55e", 
              color: "white",
              fontWeight: "bold",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
              minWidth: "80px",
            }}
          >
            {isConfirm ? "SÍ" : "OK"}
          </button>
          {isConfirm && (
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "#ef4444", 
                color: "white",
                fontWeight: "bold",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.25rem",
                border: "none",
                cursor: "pointer",
                minWidth: "80px",
              }}
            >
              NO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}