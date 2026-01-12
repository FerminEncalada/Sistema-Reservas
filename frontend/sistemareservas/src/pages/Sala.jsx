import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFutbol, FaUserCircle, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { obtenerReservas, eliminarReserva } from "../api/Reservas";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sala() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, cerrarSesionUsuario, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    cargarReservas();
  }, [isAuthenticated, navigate]);

  const cargarReservas = async () => {
    try {
      const res = await obtenerReservas();
      setReservas(res.data.data);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
      toast.error("Error al cargar tus reservas");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarReserva = (id) => {
    toast.warn(
      ({ closeToast }) => (
        <div className="space-y-2">
          <p className="font-bold">¿Cancelar esta reserva?</p>
          <p className="text-sm text-gray-600">
            Esta acción no se puede deshacer.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-green-500 text-white text-sm border rounded hover:bg-green-300"
            >
              No
            </button>

            <button
              onClick={async () => {
                closeToast();
                try {
                  await eliminarReserva(id);
                  toast.success("Reserva cancelada exitosamente");
                  cargarReservas();
                } catch {
                  toast.error("Error al cancelar la reserva");
                }
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500"
            >
              Sí, cancelar
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleCerrarSesion = async () => {
    await cerrarSesionUsuario();
    navigate("/");
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col  bg-white text-black font-display">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold">ReservaCancha</h2>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium hover:underline" to="/canchas">
            Canchas
          </Link>
          <Link className="text-sm font-medium underline" to="/sala">
            Mis Reservas
          </Link>
          {user?.rol === 'admin' && (
            <Link className="text-sm font-medium hover:underline" to="/admin/canchas">
              Panel Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm font-semibold">
            {user?.username}
          </span>
          <Link to="/perfil">
            <FaUserCircle className="text-3xl text-black cursor-pointer hover:opacity-70" />
          </Link>
          <button 
            onClick={handleCerrarSesion}
            className="flex items-center gap-2 text-sm font-bold hover:text-red-600"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-black">
              Mis Reservas
            </h1>
            <Link to="/canchas">
              <button className="h-10 rounded-lg bg-black text-white px-4 text-sm font-bold hover:opacity-90">
                Nueva Reserva
              </button>
            </Link>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-lg font-bold">Cargando reservas...</p>
            </div>
          )}

          {/* LISTA DE RESERVAS */}
          {!loading && (
            <>
              {reservas.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-300">
                  <FaCalendarAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-bold text-gray-600 mb-2">No tienes reservas</p>
                  <p className="text-sm text-gray-500 mb-4">¡Reserva tu primera cancha!</p>
                  <Link to="/canchas">
                    <button className="h-10 rounded-lg bg-black text-white px-6 text-sm font-bold hover:opacity-90">
                      Explorar Canchas
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {reservas.map((reserva) => (
                    <div
                      key={reserva._id}
                      className="overflow-hidden rounded-xl border border-gray-300 shadow-sm hover:shadow-lg transition"
                    >
                      <div className="bg-black p-4 text-white">
                        <h3 className="text-lg font-bold">
                          {reserva.cancha?.nombre || "Cancha"}
                        </h3>
                        <p className="text-sm opacity-90">
                          {reserva.cancha?.tipo || ""}
                        </p>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <p className="text-xs font-bold text-gray-500">FECHA</p>
                          <p className="font-bold">{formatearFecha(reserva.fecha)}</p>
                        </div>

                        <div className="flex gap-4">
                          <div>
                            <p className="text-xs font-bold text-gray-500">HORA INICIO</p>
                            <p className="font-bold">{reserva.horaInicio}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-500">HORA FIN</p>
                            <p className="font-bold">{reserva.horaFin}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <div>
                            <p className="text-xs font-bold text-gray-500">TOTAL</p>
                            <p className="text-xl font-black">${reserva.total}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            reserva.estado === 'confirmada' ? 'bg-green-100 text-green-800' :
                            reserva.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {reserva.estado.toUpperCase()}
                          </span>
                        </div>
<button
  onClick={() => navigate(`/reservas/editar/${reserva._id}`)}
  className="w-full mt-3 h-10 rounded-lg border border-black text-black font-bold hover:bg-gray-100"
>
  Editar Reserva
</button>

                        {reserva.estado !== 'cancelada' && (
                          <button
                            onClick={() => handleCancelarReserva(reserva._id)}
                            className="w-full mt-3 h-10 rounded-lg border border-red-600 text-red-600 font-bold hover:bg-red-50"
                          >
                            Cancelar Reserva
                          </button>
                          
                          
                        )}
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
<footer className="border-t py-6 text-xs text-gray-600">
        <div className="mx-auto max-w-5xl px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaRegFutbol />
            <span>© 2024 ReservaCancha</span>
          </div>
          <nav className="flex gap-3">
            <Link className="hover:underline" to="#">Nosotros</Link>
            <Link className="hover:underline" to="#">Contacto</Link>
            <Link className="hover:underline" to="#">Términos</Link>
          </nav>
        </div>
      </footer>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

    </div>
  );
}