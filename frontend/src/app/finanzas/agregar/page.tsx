"use client";
import Link from "next/link";
import ScaleIn from "@/components/scaleIn";


export default function SolicitudPrestamo() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <ScaleIn>
    <div className="flex justify-center py-1 pt-6 ">
      
      <form
        onSubmit={onSubmit}
        className="grid gap-2 bg-gray-100 border-2 border-red-500 p-2 rounded-xl shadow"
      >
          <div className="col-span-12 flex justify-center">
              <h2 className="text-2xl text-red-700 font-semibold">
                CREAR SOLICITUD DE PRESTAMO
              </h2>
          </div>

         {/* Botón Buscar */}
          <div className="col-span-12 flex justify-end ">
          
          </div>
         <div className="flex justify-end gap-6"></div>  
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Nombre</label>
          <input className="w-full border border-red-500 rounded p-1.5 text-xs" placeholder="Maribel" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Apellidos</label>
          <input className="w-full border border-red-500 rounded p-1.5 text-xs" placeholder="Duran" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">Apodo</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="Mari" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Cédula</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="043-042-99240-1" />
        </div>
        <div className="col-span-2">
          <span className="block text-[11px] font-bold">Estado Civil:</span>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 text-xs">
              <input type="checkbox" className="accent-red-700" /> Casado/a
            </label>
            <label className="flex items-center gap-1 text-xs">
              <input type="checkbox" className="accent-red-700" /> Soltero/a
            </label>
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Teléfono</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="829-949-4251" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Celular</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="809-241-4249" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**E-Mail</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="mari058@ejemplo.com" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Ciudad</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="San Francisco" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Tipo de Préstamo</label>
          <select className="w-full border border-red-500  rounded p-1.5 text-xs">
            <option value="">Seleccione una opción</option>
            <option>Personal</option>
            <option>Negocio</option>
            <option>Vehiculo </option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-[11px] font-bold">**Monto Solicitado (DOP)</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="54,000" />
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
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="dd/mm/aaaa" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">**Profesión</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="Contador" />
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
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="3 años" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">No. Del dependientes</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="3" />
        </div>
        <div className="col-span-3">
          <label className="block text-[11px] font-bold">Nombre de Esposo/a o Trabajo</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="Juan, Ejemplo Rent Car" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] font-bold">Teléfonos</label>
          <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="809849294, 80955549343" />
        </div>
        <div className="col-span-2 flex gap-2">
          <div className="flex-1">
            <label className="block text-[11px] font-bold">**Banco</label>
            <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="Banco Popular" />
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold">**No. de Cuenta</label>
            <input className="w-full border border-red-500  rounded p-1.5 text-xs" placeholder="111222333444" />
          </div>
        </div>

         {/* ---------------- FAMILIARES ---------------- */}
          <Section title="3 Familiares que no vivan con usted*">
            <FamilyFields />
          </Section>

          {/* ---------------- REFERENCIAS PERSONALES ---------------- */}
          <Section title="3 referencias personales*">
            <PersonalReferences />
          </Section>

          {/* ---------------- REFERENCIAS COMERCIALES ---------------- */}
          <Section title="3 referencias comerciales*">
            <CommercialReferences />
          </Section>

          {/* BOTÓN ENVIAR */}
          <div className="col-span-12 text-center mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </ScaleIn>
  );
}

/* ---------------- COMPONENTES REUTILIZABLES ---------------- */

const Input = ({
  label,
  placeholder,
  cols,
}: {
  label: string;
  placeholder: string;
  cols: string;
}) => (
  <div className={`col-span-${cols}`}>
    <label className="block text-[11px] font-bold">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border border-red-400 rounded p-1 text-xs"
    />
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="col-span-12 border border-red-300 rounded-md p-3 mt-2">
    <h3 className="text-center text-red-600 text-sm font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

/* ---------------- FAMILIARES ---------------- */
const FamilyFields = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {[1, 2, 3].map((i) => (
      <div key={i}>
        <h4 className="font-semibold text-sm mb-1">Familiar {i}*</h4>
        <div className="flex flex-col gap-1">
          <Field label="Nombre*" placeholder="Nombre" />
          <Field label="Apellido*" placeholder="Nombre" />
          <Field label="Teléfono*" placeholder="8095554444" />
          <Field label="Dirección*" placeholder="Calle Ejemplo #123" />
          <Field label="Parentesco*" placeholder="Hermano, Padre, Madre" />
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- REFERENCIAS PERSONALES ---------------- */
const PersonalReferences = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {[1, 2, 3].map((i) => (
      <div key={i}>
        <h4 className="font-semibold text-sm mb-1">Referencia {i}*</h4>
        <div className="flex flex-col gap-1">
          <Field label="Nombre*" placeholder="Raul" />
          <Field label="Apellido*" placeholder="Perez" />
          <Field label="Teléfono*" placeholder="8095554444" />
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- REFERENCIAS COMERCIALES ---------------- */
const CommercialReferences = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {[1, 2, 3].map((i) => (
      <div key={i}>
        <h4 className="font-semibold text-sm mb-1">Referencia {i}*</h4>
        <div className="flex flex-col gap-1">
          <Field label="Empresa*" placeholder="Distribuidora Ejemp." />
          <Field label="Contacto*" placeholder="Perez" />
          <Field label="Cargo*" placeholder="Director de Ventas" />
          <Field label="Teléfono*" placeholder="8095554444" />
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- CAMPO GENÉRICO ---------------- */
const Field = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <div>
    <label className="block text-[11px] font-bold">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border border-gray-400 rounded p-1 text-xs"
    />
  </div>
);
      
    