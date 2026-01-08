import React from "react";
import { Link } from "react-router-dom";
import { FaRegFutbol, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";

export default function Sala() {
 const canchas = [
  {
    id: 1,
    nombre: "Cancha El Golazo",
    ciudad: "Quito, Ecuador",
    tipo: "Fútbol 5",
    precio: 25,
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
  },
  {
    id: 2,
    nombre: "Complejo Guayas",
    ciudad: "Guayaquil, Ecuador",
    tipo: "Fútbol 7",
    precio: 30,
    rating: 4.6,
    imagen: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  },
  {
    id: 3,
    nombre: "Arena Cuencana",
    ciudad: "Cuenca, Ecuador",
    tipo: "Fútbol 11",
    precio: 45,
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
  },
];

  return (
    <div className="min-h-screen w-full bg-white text-black font-display">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold">ReservaCancha</h2>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium hover:underline" to="/sala">
            Canchas
          </Link>
          <Link className="text-sm font-medium hover:underline" to="/mis-reservas">
            Mis Reservas
          </Link>
          <Link className="text-sm font-medium hover:underline" to="/perfil">
            Perfil
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm font-semibold">
            Hola
          </span>
          <FaUserCircle className="text-3xl text-black" />
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <h1 className="mb-6 text-3xl font-black">
            Canchas Disponibles
          </h1>

          {/* GRID DE CANCHAS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {canchas.map((cancha) => (
              <div
                key={cancha.id}
                className="overflow-hidden rounded-xl border border-gray-300 shadow-sm"
              >
                <img
                  src={cancha.imagen}
                  alt={cancha.nombre}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-bold">
                    {cancha.nombre}
                  </h3>

                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                    <FaMapMarkerAlt />
                    {cancha.ubicacion}
                  </p>

                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Tipo:</span>{" "}
                    {cancha.tipo}
                  </p>

                  <p className="text-sm">
                    <span className="font-semibold">Precio:</span>{" "}
                    {cancha.precio}
                  </p>
                 <Link to='/reservas'>
                  <button className="mt-4 h-10 w-full rounded-lg border border-black font-bold hover:bg-gray-100">
                    Reservar
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-300 py-6 mt-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 sm:flex-row sm:justify-between">
          <p className="text-sm font-semibold">
            © 2024 ReservaCancha
          </p>
          <nav className="flex gap-6 text-sm">
            <Link className="hover:underline" to="#">
              Términos
            </Link>
            <Link className="hover:underline" to="#">
              Soporte
            </Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}
