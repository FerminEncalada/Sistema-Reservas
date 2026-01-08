import React from "react";
import { Link } from "react-router-dom";
import { FaRegFutbol, FaUserCircle, FaStar, FaMapMarkerAlt } from "react-icons/fa";

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

export default function Canchas() {
  return (
    <div className="min-h-screen w-full bg-white text-black font-display flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold text-black">ReservaCancha</h2>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium text-black hover:underline" to="/">
            Inicio
          </Link>
          <Link className="text-sm font-medium text-black hover:underline" to="/canchas">
            Canchas Disponibles
          </Link>
          <Link className="text-sm font-medium text-black hover:underline" to="/registro">
            Registro
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="h-10 rounded-lg border border-black px-4 text-sm font-bold hover:bg-gray-100">
              Iniciar Sesión
            </button>
          </Link>
          <FaUserCircle className="hidden sm:block text-3xl text-black" />
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex justify-center py-8">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* BUSCADOR */}
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-3">
              Canchas en Ecuador
            </h1>
            <input
              type="text"
              placeholder="Buscar por ciudad o nombre de la cancha..."
              className="h-12 w-full rounded-lg border border-black px-4 outline-none"
            />
          </div>

          {/* LISTADO */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {canchas.map((cancha) => (
              <div
                key={cancha.id}
                className="rounded-xl border border-gray-300 overflow-hidden hover:shadow-lg transition"
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cancha.imagen})` }}
                />

                <div className="p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-lg">{cancha.nombre}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <span className="text-sm font-bold">{cancha.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm font-bold">{cancha.tipo}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt />
                    <span>{cancha.ciudad}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-black">
                      ${cancha.precio}
                      <span className="text-sm font-normal"> / hora</span>
                    </p>
                    <button className="rounded-lg border border-black px-3 py-1 text-sm font-bold hover:bg-gray-100">
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-300 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <FaRegFutbol className="text-black" />
            <p className="text-sm font-semibold text-black">
              © 2024 ReservaCancha. Todos los derechos reservados.
            </p>
          </div>

          <nav className="flex gap-6 text-sm">
            <Link className="text-black hover:underline" to="#">
              Sobre Nosotros
            </Link>
            <Link className="text-black hover:underline" to="#">
              Contacto
            </Link>
            <Link className="text-black hover:underline" to="#">
              Términos
            </Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}
