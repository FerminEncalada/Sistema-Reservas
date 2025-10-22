import Reserva from '../models/reserva.model.js';
import axios from 'axios';
import User from '../models/user.model.js';
import Cancha from "../models/cancha.model.js";

export const getReservas = async (req, res) => {
    const reservas = await Reserva.find({
        user: req.user.id
    }).populate('user');
    
    res.json(reservas)
};

export const getReserva = async (req, res) => {
    const reserva = await Reserva.findById(req.params.id).populate('user');
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" })
    res.json(reserva)
};

export const createReserva = async (req, res) => {
    try {
        const { fecha, horaInicio, horaFin, total, canchaId } = req.body;
const cancha = await Cancha.findById(canchaId);

        const usuario = await User.findById(req.user.id); 

        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
        if (!cancha) return res.status(404).json({ message: "Cancha no encontrada" });

        // Crear la reserva asociada al usuario
        const newReserva = new Reserva({
            fecha,
            horaInicio,
            horaFin,
            total,
            user: usuario._id, // Guardamos solo el ObjectId
            cancha: cancha._id
        });

        const savedReserva = await newReserva.save();

        // "Populate" para enviar la reserva con todos los datos del usuario
        const reservaConUsuario = await Reserva.findById(savedReserva._id).populate('user');

        console.log('Usuario de la reserva:', usuario);
        

        await axios.post('http://localhost:5001/api/notificaciones/send', {
  email: usuario.email,
  nombre: usuario.username,
  cancha: cancha.nombre,
  fecha: reservaConUsuario.fecha,
  hora: reservaConUsuario.horaInicio
});

        res.status(201).json(reservaConUsuario);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteReserva = async (req, res) => {
    const reserva = await Reserva.findByIdAndDelete(req.params.id)
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" })
    return res.sendStatus(204);
};

export const updateReserva = async (req, res) => {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { 
        new: true 
    })
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" })
    res.json(reserva)
};
