import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaRegFutbol, FaUserCircle, FaArrowLeft, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { obtenerCancha } from "../api/Canchas";
import { crearReserva } from "../api/Reservas";
import { obtenerDisponibilidad } from "../api/Canchas";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReservarCancha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [cancha, setCancha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [loadingDisponibilidad, setLoadingDisponibilidad] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    cargarCancha();
  }, [id, isAuthenticated, navigate]);

  useEffect(() => {
    if (fecha) {
      cargarDisponibilidad();
    }
  }, [fecha]);

  const cargarCancha = async () => {
    try {
      const res = await obtenerCancha(id);
      setCancha(res.data.data);
    } catch (error) {
      toast.error("Error al cargar la cancha");
      navigate("/canchas");
    } finally {
      setLoading(false);
    }
  };

  const cargarDisponibilidad = async () => {
    setLoadingDisponibilidad(true);
    try {
      const res = await obtenerDisponibilidad(id, fecha);
      setDisponibilidad(res.data.disponibilidad || []);
    } catch (error) {
      console.error("Error al cargar disponibilidad:", error);
    } finally {
      setLoadingDisponibilidad(false);
    }
  };

  const calcularTotal = () => {
    if (!horaInicio || !horaFin || !cancha) return 0;
    
    const [inicioH, inicioM] = horaInicio.split(":").map(Number);
    const [finH, finM] = horaFin.split(":").map(Number);
    const horas = (finH + finM / 60) - (inicioH + inicioM / 60);
    
    return horas > 0 ? (horas * cancha.precioHora).toFixed(2) : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fecha || !horaInicio || !horaFin) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (horaInicio >= horaFin) {
      toast.error("La hora de fin debe ser posterior a la hora de inicio");
      return;
    }

    try {
      const total = calcularTotal();
      await crearReserva({
        fecha,
        horaInicio,
        horaFin,
        canchaId: id,
        total: parseFloat(total)
      });

      toast.success("✅ Reserva creada exitosamente");
      setTimeout(() => {
        navigate("/sala");
      }, 2000);
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error al crear la reserva";
      toast.error(mensaje);
    }
  };

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-bold">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-black font-display">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold">ReservaCancha</h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm font-semibold">
            {user?.username}
          </span>
          <Link to="/perfil">
            <FaUserCircle className="text-3xl text-black cursor-pointer hover:opacity-70" />
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <Link to="/canchas" className="inline-flex items-center gap-2 text-black hover:opacity-70 mb-6">
            <FaArrowLeft />
            <span className="text-sm font-bold">Volver a canchas</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* INFORMACIÓN DE LA CANCHA */}
            <div>
              <div
                className="h-64 rounded-xl bg-cover bg-center mb-4"
                style={{
                  backgroundImage: cancha.fotos && cancha.fotos[0]
                    ? `url(${cancha.fotos[0]})`
                    : 'url(https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf)'
                }}
              />

              <h1 className="text-3xl font-black mb-2">{cancha.nombre}</h1>
              <p className="text-sm font-bold text-gray-600 mb-4">{cancha.acronimo}</p>

              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Tipo:</span>
                  <span>{cancha.tipo}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <span className="text-sm">{cancha.ubicacion?.direccion}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaClock />
                  <span className="text-sm">
                    {cancha.horarioApertura} - {cancha.horarioCierre}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-300">
                  <p className="text-2xl font-black">
                    ${cancha.precioHora}
                    <span className="text-sm font-normal text-gray-600"> / hora</span>
                  </p>
                </div>
              </div>
            </div>

            {/* FORMULARIO DE RESERVA */}
            <div>
              <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-black mb-6">Reservar</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* FECHA */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Fecha de la reserva
                    </label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      min={obtenerFechaMinima()}
                      required
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                    />
                  </div>

                  {/* DISPONIBILIDAD */}
                  {fecha && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-bold mb-2">Horarios disponibles:</p>
                      {loadingDisponibilidad ? (
                        <p className="text-sm text-gray-600">Cargando...</p>
                      ) : disponibilidad.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {disponibilidad.map((slot, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setHoraInicio(slot.horaInicio);
                                setHoraFin(slot.horaFin);
                              }}
                              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-bold hover:bg-gray-100"
                            >
                              {slot.horaInicio} - {slot.horaFin}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">No hay horarios disponibles</p>
                      )}
                    </div>
                  )}

                  {/* HORA INICIO */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Hora de inicio
                    </label>
                    <input
                      type="time"
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e.target.value)}
                      required
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                    />
                  </div>

                  {/* HORA FIN */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Hora de fin
                    </label>
                    <input
                      type="time"
                      value={horaFin}
                      onChange={(e) => setHoraFin(e.target.value)}
                      required
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                    />
                  </div>

                  {/* TOTAL */}
                  {horaInicio && horaFin && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Total a pagar:</span>
                        <span className="text-2xl font-black">${calcularTotal()}</span>
                      </div>
                    </div>
                  )}

                  {/* BOTÓN */}
                  <button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-black text-white font-bold hover:opacity-90"
                  >
                    Confirmar Reserva
                  </button>

                </form>
              </div>
            </div>

          </div>

        </div>
      </main>

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