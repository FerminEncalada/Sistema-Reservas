import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter  } from 'react-router-dom';
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import  Sala  from './pages/Sala';
import Registro from './pages/Registro';
import Canchas from './pages/Canchas';
import Reservas from './pages/Reservas';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sala" element={<Sala />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/canchas" element={<Canchas />} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;