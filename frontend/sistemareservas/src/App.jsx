import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import  Sala  from './pages/Sala';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sala" element={<Sala />} />
      </Routes>
    </Router>
  );
}

export default App;