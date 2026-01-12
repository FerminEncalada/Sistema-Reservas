import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Sala from './pages/Sala';
import Registro from './pages/Registro';
import Canchas from './pages/Canchas';
import ReservarCancha from './pages/ReservarCancha';
import Perfil from './pages/Perfil';
import AdminCanchas from './pages/AdminCanchas';
import NuevaCancha from './pages/NuevaCancha';
import CanchasInicio from './pages/Canchasinicio';
import EditarReservas from './pages/EditarReservas';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/canchas" element={<Canchas />} />
          <Route path="/canchasinicio" element={<CanchasInicio />} />          
          
          {/* Rutas protegidas - Usuario */}
          <Route path="/sala" element={<Sala />} />
          <Route path="/reservar/:id" element={<ReservarCancha />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/reservas/editar/:id" element={<EditarReservas />} />
          
          {/* Rutas protegidas - Admin */}
          <Route path="/admin/canchas" element={<AdminCanchas />} />
          <Route path="/admin/canchas/nueva" element={<NuevaCancha />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;