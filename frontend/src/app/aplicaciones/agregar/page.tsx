"use client";
import Link from "next/link";


export default function SolicitudPrestamo() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div className="max-w-6xl mx-auto p-4">
      
      <form
        onSubmit={onSubmit}
        className="grid  gap-2 bg-gray-100 border-2 border-green-500 p-4 rounded-xl shadow"
      >
            <h2 className="text-lg center text-green-700 font-semibold text-center mb-4 w-full">Haz tu consulta</h2>
          <div className="col-span-12 flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1.5 text-sm rounded hover:bg-green-700"
          >
            Agregar
          </button>
          <Link 
            href="/consulta"
            type="button"
            className="bg-green-600 text-white px-3 py-1.5 text-sm rounded hover:bg-green-700"
          >
            Buscar
          </Link >
        </div>
        
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Nombre</label>
          <input className="w-full border border-green-500 rounded p-1.5 text-xs" placeholder="Maribel" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Apellidos</label>
          <input className="w-full border border-green-500 rounded p-1.5 text-xs" placeholder="Duran" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">Apodo</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="Mari" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Cédula</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="043-042-99240-1" />
        </div>
        <div className="col-span-2">
          <span className="block text-[11px] font-bold">Estado Civil:</span>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 text-xs">
              <input type="checkbox" className="accent-gray-700" /> Casado/a
            </label>
            <label className="flex items-center gap-1 text-xs">
              <input type="checkbox" className="accent-gray-700" /> Soltero/a
            </label>
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Teléfono</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="829-949-4251" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Celular</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="809-241-4249" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**E-Mail</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="mari058@ejemplo.com" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Ciudad</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="San Francisco" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Tipo de Préstamo</label>
          <select className="w-full border border-green-500  rounded p-1.5 text-xs">
            <option value="">Seleccione una opción</option>
            <option>Personal</option>
            <option>Negocio</option>
            <option>Vehiculo </option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Monto Solicitado (DOP)</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="54,000" />
        </div>
        <div className="col-span-3">
          <span className="block text-[11px] font-bold">Vivienda</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 text-xs">
              <input type="radio" name="vivienda" className="accent-gray-700" /> Propia
            </label>
            <label className="flex items-center gap-1 text-xs">
              <input type="radio" name="vivienda" className="accent-gray-700" /> Alquilada
            </label>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Inició a vivir en</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="dd/mm/aaaa" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Profesión</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="Contador" />
        </div>
        <div className="col-span-2">
          <span className="block text-[11px] font-bold">**Negocio propio</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 text-xs">
              <input type="radio" name="negocio" className="accent-gray-700" /> Sí
            </label>
            <label className="flex items-center gap-1 text-xs">
              <input type="radio" name="negocio" className="accent-gray-700" /> No
            </label>
          </div>
        </div>

        <div className="col-span-3">
          <label className="block text-[11px] font-bold">
            Tiempo operando el negocio <span className="font-normal">(Si aplica)</span>
          </label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="3 años" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">No. Del dependientes</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="3" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">Nombre de Esposo/a o Trabajo</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="Juan, Ejemplo Rent Car" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">Teléfonos</label>
          <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="809849294, 80955549343" />
        </div>
        <div className="col-span-2 flex gap-2">
          <div className="flex-1">
            <label className="block text-[11px] font-bold">**Banco</label>
            <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="Banco Popular" />
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold">**No. de Cuenta</label>
            <input className="w-full border border-green-500  rounded p-1.5 text-xs" placeholder="111222333444" />
          </div>
        </div>

      
      </form>
    </div>
  );
}