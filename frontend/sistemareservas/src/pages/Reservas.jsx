import React from "react";
import { Link } from "react-router-dom";
import { FaRegFutbol, FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reservas() {

  const handleReservar = (e) => {
    e.preventDefault();
    toast.success("✅ Reserva registrada correctamente");
  };

  return (
    <div className="min-h-screen w-full bg-background-light font-display text-slate-800">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold text-black">
            ReservaCancha
          </h2>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium hover:underline" to="/">
            Canchas
          </Link>
          <Link className="text-sm font-medium hover:underline" to="/misreservas">
            Mis Reservas
          </Link>
          <Link className="text-sm font-medium underline" to="/reservas">
            Perfil
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Hola</span>
          <FaUserCircle className="hidden sm:block text-3xl" />
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-md mx-auto px-4 py-14">

        <h1 className="text-4xl font-black mb-10 text-center">
          Nueva Reserva
        </h1>

        <form
          onSubmit={handleReservar}
          className="bg-white border rounded-xl p-6 shadow-lg space-y-6"
        >

          {/* FECHA */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Fecha
            </label>
            <input
              type="date"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* HORA INICIO */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Hora de inicio
            </label>
            <input
              type="time"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* HORA FIN */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Hora de fin
            </label>
            <input
              type="time"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-black text-white font-bold hover:opacity-90"
          >
            Reservar
          </button>

        </form>

        {/* TOAST */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold">
            © 2024 ReservaCancha
          </p>
          <nav className="flex gap-6 text-sm">
            <Link className="hover:underline" to="#">
              Contacto
            </Link>
            <Link className="hover:underline" to="#">
              Términos
            </Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}
