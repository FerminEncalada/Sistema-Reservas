import React, { useEffect, useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { obtenerReserva, actualizarReserva } from "../api/Reservas";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegFutbol, FaUserCircle, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

export default function EditarReservas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [loading, setLoading] = useState(true);
const fechaMin = new Date().toISOString().split("T")[0];
  const { user, cerrarSesionUsuario, isAuthenticated } = useAuth();

useEffect(() => {
  cargarReserva();
}, [id]);

  const handleCerrarSesion = async () => {
    await cerrarSesionUsuario();
    navigate("/");
  };
  

  const cargarReserva = async () => {
    try {
      const res = await obtenerReserva(id);
      const r = res.data.data;

      const fechaSinZona = new Date(r.fecha).toISOString().substring(0, 10);
setFecha(fechaSinZona);
      setHoraInicio(r.horaInicio);
      setHoraFin(r.horaFin);
    } catch {
      toast.error("Error al cargar la reserva");
      navigate("/sala");
    } finally {
      setLoading(false);
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (horaInicio >= horaFin) {
    toast.error("Hora fin debe ser mayor a inicio");
    return;
  }

  try {
    await actualizarReserva(id, {
      fecha,
      horaInicio,
      horaFin,
    });

    toast.success("Reserva actualizada correctamente");

    // Espera 2 segundos antes de cambiar a /sala
    setTimeout(() => {
      navigate("/sala");
    }, 2000);

  } catch (error) {
    const msg =
      error.response?.data?.message || "Error al actualizar la reserva";
    toast.error(msg);
  }
};

  if (loading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="min-h-screen flex flex-col  bg-white text-black font-display">
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

      <main className="flex-1 py-8">
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl border">
       <div className="mb-4">
  <button
    type="button"
    onClick={() => navigate("/sala")}
    className="text-sm font-semibold text-gray-600 hover:text-black flex items-center gap-2"
  >
    ← Volver
  </button>
</div>

      <h1 className="text-2xl font-black mb-4">Editar Reserva</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
  type="date"
  min={fechaMin}
  value={fecha}
  onChange={(e) => setFecha(e.target.value)}
  className="w-full h-12 border rounded px-4"
  required
/>

        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          className="w-full h-12 border rounded px-4"
          required
        />

        <input
          type="time"
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
          className="w-full h-12 border rounded px-4"
          required
        />

       <button
  disabled={loading}
  className="w-full h-12 bg-black text-white rounded font-bold disabled:opacity-50"
>
  Guardar cambios
</button>

      </form>
    </div>
      </main>

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
