import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFutbol, FaUserCircle, FaEdit, FaSignOutAlt, FaSave, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { obtenerPerfil, actualizarUsuario } from "../api/Autenticacion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Perfil() {
  const { user, cerrarSesionUsuario, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nombre: "",
    apellido: "",
    cedula: "",
    password: ""
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    cargarPerfil();
  }, [isAuthenticated, navigate]);

  const cargarPerfil = async () => {
    try {
      const res = await obtenerPerfil();
      setPerfil(res.data.user);
      setFormData({
        username: res.data.user.username,
        email: res.data.user.email,
        nombre: res.data.user.nombre,
        apellido: res.data.user.apellido,
        cedula: res.data.user.cedula,
        password: ""
      });
    } catch (error) {
      toast.error("Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToUpdate = {
        username: formData.username,
        email: formData.email,
        nombre: formData.nombre,
        apellido: formData.apellido,
        cedula: formData.cedula
      };

      // Solo incluir password si se ingresó uno nuevo
      if (formData.password) {
        dataToUpdate.password = formData.password;
      }

      await actualizarUsuario(perfil.id, dataToUpdate);
      toast.success("✅ Perfil actualizado exitosamente");
      setEditando(false);
      cargarPerfil();
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error al actualizar el perfil";
      toast.error(mensaje);
    }
  };

  const handleCancelar = () => {
    setEditando(false);
    setFormData({
      username: perfil.username,
      email: perfil.email,
      nombre: perfil.nombre,
      apellido: perfil.apellido,
      cedula: perfil.cedula,
      password: ""
    });
  };

  const handleCerrarSesion = async () => {
    await cerrarSesionUsuario();
    toast.success("Sesión cerrada exitosamente");
    navigate("/");
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-bold">Cargando perfil...</p>
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

        <nav className="hidden md:flex gap-8">
          <Link className="text-sm font-medium hover:underline" to="/canchas">
            Canchas
          </Link>
          <Link className="text-sm font-medium hover:underline" to="/sala">
            Mis Reservas
          </Link>
          {user?.rol === 'admin' && (
            <Link className="text-sm font-medium hover:underline" to="/admin/canchas">
              Admin
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
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          <h1 className="text-3xl font-black mb-8">Mi Perfil</h1>

          <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
            
            {/* HEADER DEL PERFIL */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-6xl text-gray-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">
                    {perfil?.nombre} {perfil?.apellido}
                  </h2>
                  <p className="text-sm opacity-90">@{perfil?.username}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                    perfil?.rol === 'admin' ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-400 text-blue-900'
                  }`}>
                    {perfil?.rol === 'admin' ? 'ADMINISTRADOR' : 'USUARIO'}
                  </span>
                </div>
              </div>
            </div>

            {/* INFORMACIÓN DEL PERFIL */}
            <div className="p-8">
              
              {!editando ? (
                // MODO VISTA
                <>
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">NOMBRE DE USUARIO</p>
                        <p className="font-bold text-lg">{perfil?.username}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">CORREO ELECTRÓNICO</p>
                        <p className="font-bold text-lg">{perfil?.email}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">NOMBRE COMPLETO</p>
                        <p className="font-bold text-lg">
                          {perfil?.nombre} {perfil?.apellido}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">CÉDULA</p>
                        <p className="font-bold text-lg">{perfil?.cedula}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-gray-500 mb-1">MIEMBRO DESDE</p>
                          <p className="font-bold">{formatearFecha(perfil?.createdAt)}</p>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-gray-500 mb-1">ÚLTIMA ACTUALIZACIÓN</p>
                          <p className="font-bold">{formatearFecha(perfil?.updatedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTÓN EDITAR */}
                  <div className="pt-6 flex gap-4">
                    <button
                      onClick={() => setEditando(true)}
                      className="flex-1 h-12 rounded-lg border border-black font-bold hover:bg-gray-100 flex items-center justify-center gap-2"
                    >
                      <FaEdit />
                      Editar Perfil
                    </button>
                  </div>
                </>
              ) : (
                // MODO EDICIÓN
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Nombre de usuario
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Cédula
                      </label>
                      <input
                        type="text"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        required
                        maxLength="10"
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Nueva contraseña (opcional)
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Dejar vacío para no cambiar"
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* BOTONES */}
                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={handleCancelar}
                      className="flex-1 h-12 rounded-lg border border-gray-300 font-bold hover:bg-gray-100 flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-12 rounded-lg bg-black text-white font-bold hover:opacity-90 flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              )}

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