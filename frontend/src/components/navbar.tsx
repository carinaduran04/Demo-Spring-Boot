import Link from "next/link";
import { FaWpforms, FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex justify-center mt-4 fixed right-0 left-0 top-0">
      <nav className="bg-gray-100 text-green-800 font-semibold a500 px-6 py-3 shadow-md rounded-md w-[80%] max-w-5xl">
        <ul className="flex space-x-6 items-center justify-center">
          <li className="flex items-center space-x-2">
            <FaWpforms className="text-lg" />
            <Link href="/">Formulario</Link>
          </li>
          <li className="flex items-center space-x-2">
            <FaUser className="text-lg" />
            <Link href="/consulta">Buscar</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
