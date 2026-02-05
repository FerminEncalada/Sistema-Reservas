import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFutbol, FaUserCircle, FaPlus, FaEdit, FaTrash, FaSignOutAlt } from "react-icons/fa";
import { obtenerCanchas, eliminarCancha } from "../api/Canchas";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminCanchas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, cerrarSesionUsuario, isAuthenticated } = useAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (user?.rol !== 'admin') {
      toast.error("No tienes permisos de administrador");
      navigate("/sala");
      return;
    }
    
    cargarCanchas();
  }, [isAuthenticated, user, navigate]);

  const cargarCanchas = async () => {
    try {
      const res = await obtenerCanchas();
      setCanchas(res.data.data);
    } catch (error) {
      toast.error("Error al cargar canchas");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar la cancha "${nombre}"?`)) return;

    try {
      await eliminarCancha(id);
      toast.success("Cancha eliminada exitosamente");
      cargarCanchas();
    } catch (error) {
      toast.error("Error al eliminar la cancha");
    }
  };

  const handleCerrarSesion = async () => {
    await cerrarSesionUsuario();
    navigate("/"); // ✅ REDIRIGIR AL INICIO EN LUGAR DE /login
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-black font-display">

      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold">ReservaCancha - Admin</h2>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium underline" to="/admin/canchas">
            Gestión Canchas
          </Link>
          <Link className="text-sm font-medium hover:underline" to="/sala">
            Ver como Usuario
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm font-semibold">
            Admin: {user?.username}
          </span>
          <FaUserCircle className="text-3xl text-black" />
          <button 
            onClick={handleCerrarSesion}
            className="flex items-center gap-2 text-sm font-bold hover:text-red-600"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="py-8 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-black">
              Gestión de Canchas
            </h1>
            <Link to="/admin/canchas/nueva">
              <button className="flex items-center gap-2 h-12 rounded-lg bg-black text-white px-6 text-sm font-bold hover:opacity-90">
                <FaPlus />
                Nueva Cancha
              </button>
            </Link>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-lg font-bold">Cargando canchas...</p>
            </div>
          )}

          {/* TABLA DE CANCHAS */}
          {!loading && (
            <>
              {canchas.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-300">
                  <p className="text-lg font-bold text-gray-600 mb-2">No hay canchas registradas</p>
                  <p className="text-sm text-gray-500 mb-4">Crea tu primera cancha</p>
                  <Link to="/admin/canchas/nueva">
                    <button className="h-10 rounded-lg bg-black text-white px-6 text-sm font-bold hover:opacity-90">
                      Nueva Cancha
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-300">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase">
                            Nombre
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase">
                            Tipo
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase">
                            Acrónimo
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase">
                            Precio/Hora
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase">
                            Estado
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase">
                            Horario
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-black text-gray-600 uppercase">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {canchas.map((cancha) => (
                          <tr key={cancha._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-12 h-12 rounded-lg bg-cover bg-center"
                                  style={{
                                    backgroundImage: cancha.fotos && cancha.fotos[0]
                                      ? `url(http://localhost:3000${cancha.fotos[0]})`
                                      : 'url(https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf)'
                                  }}
                                />
                                <div>
                                  <p className="font-bold">{cancha.nombre}</p>
                                  <p className="text-xs text-gray-500 truncate max-w-xs">
                                    {cancha.ubicacion?.direccion}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {cancha.tipo}
                            </td>
                            <td className="px-6 py-4 font-bold">
                              {cancha.acronimo}
                            </td>
                            <td className="px-6 py-4 font-black">
                              ${cancha.precioHora}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                cancha.estado === 'disponible' ? 'bg-green-100 text-green-800' :
                                cancha.estado === 'ocupada' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {cancha.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {cancha.horarioApertura} - {cancha.horarioCierre}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                {/* ✅ BOTÓN EDITAR FUNCIONAL */}
                                <Link to={`/admin/canchas/editar/${cancha._id}`}>
                                  <button
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                    title="Editar"
                                  >
                                    <FaEdit />
                                  </button>
                                </Link>
                                <button
                                  onClick={() => handleEliminar(cancha._id, cancha.nombre)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                  title="Eliminar"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-6 text-xs text-gray-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 sm:flex-row sm:justify-between">
          <p className="text-sm font-semibold">
            © 2024 ReservaCancha - Panel de Administración
          </p>
          <nav className="flex gap-6 text-sm">
            <Link className="hover:underline" to="#">
              Soporte
            </Link>
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