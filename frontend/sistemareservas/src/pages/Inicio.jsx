import React from "react";
import { Link } from "react-router-dom";
import { FaRegFutbol, FaUserCircle } from "react-icons/fa";

export default function Inicio() {
  return (
    <div className="min-h-screen w-full bg-white text-black font-display">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
         <Link className="text-sm font-medium hover:underline" to="/">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl" />
          <h2 className="text-lg font-bold">ReservaCancha</h2>
        </div>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium hover:underline" to="/">Inicio</Link>
          <Link className="text-sm font-medium hover:underline" to="/canchasinicio">Canchas</Link>
          <Link className="text-sm font-medium hover:underline" to="/registro">Registro</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="h-10 rounded-lg border border-black px-4 text-sm font-bold hover:bg-gray-100">
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex justify-center py-10">
        <div className="w-full h-full max-w-full px-4 sm:px-6 lg:px-8">

          {/* HERO PRINCIPAL */}
          <section
            className="flex min-h-[600px] flex-col items-center justify-center gap-6 rounded-2xl bg-cover bg-center px-6 py-10 text-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.65)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7ny0qkv0f4CQkO5vMzIAsg3LDRLOij1SE1NpZ65nQLCqesGVc1b88EcrTsx_hMLLUt8lVgro4Y4MJpb8YLWWZXAfG0oF-Dyt2Bsw0q5XOQp_PJu2g0I7OPLUM03TJb_jcUybvgW5L693wRWGyF4BaTe8fZjPdQuGO_VrlbsHST4TruLX7rGzxQxoAQY0HeK0sppmzq39puQdiz2WfkJaaVfELmuEnvjLN2z3JxZwTFbDIimMiVihvX6J46rUH922v1CYy6PNqYg")',
            }}
          >
            <h1 className="text-4xl font-black text-white sm:text-5xl">
              Encuentra tu cancha ideal
            </h1>
            <p className="max-w-xl text-base text-white sm:text-lg">
              Reserva fácil y rápido en los mejores complejos deportivos
            </p>
          </section>

          {/* HERO SECUNDARIO / MENSAJE */}
          <section
            className="mt-16 flex min-h-[500px] items-center justify-center rounded-2xl bg-cover bg-center px-6 text-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.6)), url("https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf")',
            }}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white">
                Alquila canchas 100% en línea
              </h2>
              <p className="mt-4 text-white text-base">
                En esta aplicación puedes alquilar canchas deportivas desde cualquier lugar,
                elegir el horario que más te convenga y acceder a los mejores precios disponibles.
              </p>
            </div>
          </section>

          {/* BENEFICIOS */}
          <section className="mt-24 grid gap-8 sm:grid-cols-3">
            <h1 className="sm:col-span-3 text-3xl font-black text-center">¿Por qué reservar con nosotros?</h1>
            <div className="rounded-xl border border-black p-6 text-center">
              <h3 className="text-lg font-bold">Reserva en línea</h3>
              <p className="mt-2 text-sm text-gray-700">
                Alquila tu cancha sin llamadas ni filas, todo desde la aplicación.
              </p>
            </div>

            <div className="rounded-xl border border-black p-6 text-center">
              <h3 className="text-lg font-bold">Horarios flexibles</h3>
              <p className="mt-2 text-sm text-gray-700">
                Encuentra disponibilidad en diferentes horarios que se adapten a ti.
              </p>
            </div>

            <div className="rounded-xl border border-black p-6 text-center">
              <h3 className="text-lg font-bold">Mejores precios</h3>
              <p className="mt-2 text-sm text-gray-700">
                Compara opciones y reserva al mejor precio disponible.
              </p>
            </div>
          </section>

          {/* REGISTRO */}
          <section className="mt-20 flex justify-center">
            <div className="w-3/4 max-ful rounded-2xl border border-black px-6 py-8 text-center shadow-sm">
              <h3 className="text-xl font-bold">
                Regístrate y empieza a jugar
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Crea tu cuenta para alquilar canchas y gestionar tus reservas.
              </p>

              <Link to="/registro">
                <button className="mt-5 h-11 w-1/2 rounded-lg border border-black font-bold hover:bg-gray-100">
                  Registrarse
                </button>
              </Link>
            </div>
          </section>

         

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-300 py-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <FaRegFutbol />
            <p className="text-xs font-semibold">© 2024 ReservaCancha</p>
          </div>

          <nav className="flex gap-4 text-xs">
            <Link className="hover:underline" to="#">Sobre Nosotros</Link>
            <Link className="hover:underline" to="#">Contacto</Link>
            <Link className="hover:underline" to="#">Términos</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
