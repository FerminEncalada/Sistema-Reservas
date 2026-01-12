import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegFutbol, FaMapMarkerAlt, FaClock,FaUserCircle } from "react-icons/fa";
import { obtenerCanchas } from "../api/Canchas";
import fotodefecto from "../photo/foto.jpg"




export default function Canchas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarCanchas();
  }, []);

  const cargarCanchas = async () => {
    try {
      const res = await obtenerCanchas();
      setCanchas(res.data.data);
    } catch (error) {
      console.error("Error al cargar canchas:", error);
    } finally {
      setLoading(false);
    }
  };

  const canchasFiltradas = canchas.filter((cancha) =>
    cancha.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cancha.ubicacion?.direccion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-white text-black font-display flex flex-col">

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
      <main className="flex-1 flex justify-center py-8">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* TITULO */}
          <div className="mb-8">
            <h1 className="text-3xl font-black">
              Canchas disponibles
            </h1>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-lg font-bold">Cargando canchas...</p>
            </div>
          )}

          {/* LISTADO */}
          {!loading && (
            <>
              {canchasFiltradas.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-bold">No se encontraron canchas</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {canchasFiltradas.map((cancha) => (
                    <div
                      key={cancha._id}
                      className="rounded-xl border border-gray-300 overflow-hidden hover:shadow-lg transition"
                    >
                      <div
                        className="h-40 bg-cover bg-center bg-gray-200"
                        style={{
                           backgroundImage: cancha.fotos && cancha.fotos[0]
                                      ? `url(http://localhost:3000${cancha.fotos[0]})`
                            :  `url(${fotodefecto})`
                        }}
                      />

                      <div className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-black text-lg">{cancha.nombre}</h3>
                            <p className="text-xs font-bold text-gray-600">
                              {cancha.acronimo}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            cancha.estado === 'disponible'
                              ? 'bg-green-100 text-green-800'
                              : cancha.estado === 'ocupada'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {cancha.estado}
                          </span>
                        </div>

                        <p className="text-sm font-bold">{cancha.tipo}</p>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaMapMarkerAlt />
                          <span className="truncate">
                            {cancha.ubicacion?.direccion || "Sin ubicación"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaClock />
                          <span>
                            {cancha.horarioApertura} - {cancha.horarioCierre}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-lg font-black">
                            ${cancha.precioHora}
                            <span className="text-sm font-normal"> / hora</span>
                          </p>
                         
                          <Link to={`/login`}>
                            <button className="rounded-lg border border-black px-4 py-2 text-sm font-bold hover:bg-gray-100">
                              Reservar
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

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
