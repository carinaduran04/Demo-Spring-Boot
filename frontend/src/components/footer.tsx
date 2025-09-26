"use client";

export default function FooterPage() {
  return (
    <footer className="flex items-center justify-between py-4 px-7  bg-green-600 text-white text-sm">
      <p>
        &copy; {new Date().getFullYear()} DRTG CLOUD TECHNOLOGY Todos los derechos
        reservados.
      </p>
      <p>&copy; Powered By DRTechGroup</p>
    </footer>
  );
}
