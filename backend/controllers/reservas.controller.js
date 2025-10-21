import Reserva from '../models/reserva.model.js';

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
    const { fecha, horaInicio, horaFin, total } = req.body
    const newReserva = new Reserva ({
        fecha,
        horaInicio,
        horaFin,
        total,
        user: req.user.id,
    });
    const savedReserva = await newReserva.save();
    res.status(201).json(savedReserva);
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
