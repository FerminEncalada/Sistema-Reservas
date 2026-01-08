import React from "react";
import { Link } from "react-router-dom";
import { FaRegFutbol, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function Inicio() {
  return (
    <div className="min-h-screen w-full bg-white text-black font-display">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold text-black">
            ReservaCancha
          </h2>
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
          <Link to="/login" className="text-sm font-medium text-black hover:underline">
             <button className="h-10 rounded-lg border border-black px-4 text-sm font-bold text-black hover:bg-gray-100">
            Iniciar Sesión
          </button>
          </Link>
          <FaUserCircle className="hidden sm:block text-3xl text-black" />
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex justify-center py-6">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* HERO */}
          <div
            className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center p-6 text-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.55)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7ny0qkv0f4CQkO5vMzIAsg3LDRLOij1SE1NpZ65nQLCqesGVc1b88EcrTsx_hMLLUt8lVgro4Y4MJpb8YLWWZXAfG0oF-Dyt2Bsw0q5XOQp_PJu2g0I7OPLUM03TJb_jcUybvgW5L693wRWGyF4BaTe8fZjPdQuGO_VrlbsHST4TruLX7rGzxQxoAQY0HeK0sppmzq39puQdiz2WfkJaaVfELmuEnvjLN2z3JxZwTFbDIimMiVihvX6J46rUH922v1CYy6PNqYg")',
            }}
          >
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Encuentra tu cancha ideal
            </h1>
            <p className="text-base text-white sm:text-lg">
              Reserva fácil y rápido en los mejores complejos deportivos
            </p>
          </div>

          {/* BUSCADOR 
          <div className="mt-8">
            <label className="flex h-12 w-full items-center rounded-lg border border-black bg-white px-4">
              <FiSearch className="text-lg text-black" />
              <input
                className="ml-3 w-full bg-transparent outline-none placeholder:text-gray-600 text-black"
                placeholder="Buscar por club o ubicación..."
              />
            </label>
          </div>
*/}
          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <button className="h-12 w-full max-w-sm rounded-lg border border-black font-bold text-black hover:bg-gray-100">
              Ver todas las canchas
            </button>
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
            <Link className="text-black hover:underline" to="#">Sobre Nosotros</Link>
            <Link className="text-black hover:underline" to="#">Contacto</Link>
            <Link className="text-black hover:underline" to="#">Términos</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
