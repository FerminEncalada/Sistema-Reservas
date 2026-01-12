import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFutbol, FaArrowLeft } from "react-icons/fa";
import { crearCancha } from "../api/Canchas";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NuevaCancha() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
const [isDragging, setIsDragging] = useState(false);

const handleImage = (file) => {
  if (!file || !file.type.startsWith("image/")) {
    toast.error("Solo se permiten imágenes");
    return;
  }

  setFormData({
    ...formData,
    fotos: [file], // 🔒 solo una imagen
  });

  setPreview(URL.createObjectURL(file));
};


  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    precioHora: "",
    acronimo: "",
    estado: "disponible",
    direccion: "",
    lat: "",
    lng: "",
  fotos: [],
    horarioApertura: "",
    horarioCierre: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generarAcronimo = () => {
    if (!formData.nombre) {
      toast.warning("Primero ingresa el nombre de la cancha");
      return;
    }

    const palabras = formData.nombre.trim().split(" ");
    const letras = palabras.map(p => p[0].toUpperCase()).join("");
    
    setFormData({
      ...formData,
      acronimo: `${letras}1`
    });
    
    toast.info(`Acrónimo sugerido: ${letras}1. Puedes modificarlo si lo deseas.`);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("nombre", formData.nombre);
    data.append("tipo", formData.tipo);
    data.append("precioHora", formData.precioHora);
    data.append("acronimo", formData.acronimo);
    data.append("estado", formData.estado);
    data.append("direccion", formData.direccion);
    data.append("lat", formData.lat);
    data.append("lng", formData.lng);
    data.append("horarioApertura", formData.horarioApertura);
    data.append("horarioCierre", formData.horarioCierre);

   for (let i = 0; i < formData.fotos.length; i++) {
  data.append("fotos", formData.fotos[i]);
}

    await crearCancha(data);
    toast.success("✅ Cancha creada exitosamente");

    setTimeout(() => navigate("/admin/canchas"), 1500);

  } catch (error) {
    toast.error("Error al crear la cancha");
  }
};


  return (
    <div className="min-h-screen w-full bg-white text-black font-display">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <FaRegFutbol className="text-2xl text-black" />
          <h2 className="text-lg font-bold">ReservaCancha - Admin</h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm font-semibold">
            Admin: {user?.username}
          </span>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          <Link to="/admin/canchas" className="inline-flex items-center gap-2 text-black hover:opacity-70 mb-6">
            <FaArrowLeft />
            <span className="text-sm font-bold">Volver a gestión de canchas</span>
          </Link>

          <h1 className="text-3xl font-black mb-8">Nueva Cancha</h1>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl p-6 shadow-lg space-y-6">

            {/* INFORMACIÓN BÁSICA */}
            <div className="space-y-4">
              <h2 className="text-xl font-black">Información Básica</h2>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Nombre de la cancha *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Cancha El Golazo 1"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                />
                <p className="text-xs text-gray-500 mt-1">Mínimo 10 caracteres</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Tipo de cancha *
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Fútbol 5">Fútbol 5</option>
                    <option value="Fútbol 7">Fútbol 7</option>
                    <option value="Fútbol 8">Fútbol 8</option>
                    <option value="Fútbol 11">Fútbol 11</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Sintética">Sintética</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Precio por hora (USD) *
                  </label>
                  <input
                    type="number"
                    name="precioHora"
                    value={formData.precioHora}
                    onChange={handleChange}
                    required
                    min="1"
                    step="0.01"
                    placeholder="25.00"
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Acrónimo *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="acronimo"
                      value={formData.acronimo}
                      onChange={handleChange}
                      required
                      placeholder="EG1"
                      className="flex-1 h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={generarAcronimo}
                      className="h-12 px-4 border border-black rounded-lg text-sm font-bold hover:bg-gray-100"
                    >
                      Generar
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Ej: Cancha El Golazo → EG1</p>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Estado
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="ocupada">Ocupada</option>
                    <option value="mantenimiento">Mantenimiento</option>
                  </select>
                </div>
              </div>
            </div>

            {/* UBICACIÓN */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-black">Ubicación</h2>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  placeholder="Av. Principal y Calle Secundaria, Quito"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Latitud
                  </label>
                  <input
                    type="number"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    step="0.000001"
                    placeholder="-0.180653"
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Longitud
                  </label>
                  <input
                    type="number"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    step="0.000001"
                    placeholder="-78.467834"
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* HORARIOS */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-black">Horarios</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Hora de apertura *
                  </label>
                  <input
                    type="time"
                    name="horarioApertura"
                    value={formData.horarioApertura}
                    onChange={handleChange}
                    required
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Hora de cierre *
                  </label>
                  <input
                    type="time"
                    name="horarioCierre"
                    value={formData.horarioCierre}
                    onChange={handleChange}
                    required
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* FOTOS */}
            {/* FOTO DE LA CANCHA */}
<div className="space-y-3 pt-6 border-t border-gray-200">
  <h2 className="text-xl font-black">Imagen de la cancha</h2>

  <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={(e) => {
      e.preventDefault();
      setIsDragging(false);
      handleImage(e.dataTransfer.files[0]);
    }}
    className={`relative flex items-center justify-center h-56 rounded-xl border-2 border-dashed cursor-pointer transition
      ${isDragging ? "border-black bg-gray-100" : "border-gray-300"}
    `}
  >
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImage(e.target.files[0])}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />

    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="h-full w-full object-cover rounded-xl"
      />
    ) : (
      <div className="text-center">
        <p className="font-bold">Arrastra una imagen aquí</p>
        <p className="text-sm text-gray-500">o haz clic para seleccionarla</p>
        <p className="text-xs text-gray-400 mt-2">
          Formato JPG / PNG · Solo 1 imagen
        </p>
      </div>
    )}
  </div>
</div>


            {/* BOTONES */}
            <div className="flex gap-4 pt-6">
              <Link to="/admin/canchas" className="flex-1">
                <button
                  type="button"
                  className="w-full h-12 text-white  rounded-lg border bg-red-600 border-gray-300 font-bold hover:opacity-90"
                >
                  Cancelar
                </button>
              </Link>
              <button
                type="submit"
                className="flex-1 h-12 rounded-lg bg-green-600 text-white font-bold hover:opacity-90"
              >
                Crear Cancha
              </button>
            </div>

          </form>

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