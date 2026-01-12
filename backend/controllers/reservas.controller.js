import Reserva from '../models/reserva.model.js';
import axios from 'axios';
import User from '../models/user.model.js';
import Cancha from "../models/cancha.model.js";

export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find({ user: req.user.id })
            .populate('user')
            .populate('cancha');

        if (reservas.length === 0) {
            return res.status(200).json({
                success: true,
                message: "ℹ️ No tienes reservas registradas.",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Reservas obtenidas exitosamente.",
            data: reservas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al obtener las reservas.",
            error: error.message
        });
    }
};

// Obtener una reserva por ID
export const getReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id)
            .populate('user')
            .populate('cancha');

        if (!reserva) {
            return res.status(404).json({
                success: false,
                message: "❌ Reserva no encontrada."
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Reserva obtenida correctamente.",
            data: reserva
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al obtener la reserva.",
            error: error.message
        });
    }
};

// Crear una nueva reserva
// Crear una nueva reserva
export const createReserva = async (req, res) => {
    try {
        const { fecha, horaInicio, horaFin, canchaId, estado } = req.body;

        const usuario = await User.findById(req.user.id);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const cancha = await Cancha.findById(canchaId);
        if (!cancha) return res.status(404).json({ message: "Cancha no encontrada" });

        // Validar horario dentro del rango
        const apertura = parseInt(cancha.horarioApertura.split(":")[0]);
        const cierre = parseInt(cancha.horarioCierre.split(":")[0]);
        const inicioReserva = parseInt(horaInicio.split(":")[0]);
        const finReserva = parseInt(horaFin.split(":")[0]);

        if (inicioReserva < apertura || finReserva > cierre) {
            return res.status(400).json({
                success: false,
                message: "⛔ Horario fuera del rango de atención de la cancha"
            });
        }

        // Verificar conflicto horario
        const conflicto = await Reserva.findOne({
            cancha: cancha._id,
            fecha: new Date(fecha),
            $or: [
                { horaInicio: { $lt: horaFin }, horaFin: { $gt: horaInicio } }
            ],
            estado: { $in: ['pendiente', 'confirmada'] }
        });

        if (conflicto) {
            return res.status(400).json({
                success: false,
                message: "⛔ Ya existe una reserva en ese horario para la cancha seleccionada"
            });
        }

        // Calcular total
        const [inicioH, inicioM] = horaInicio.split(":").map(Number);
        const [finH, finM] = horaFin.split(":").map(Number);
        const horas = (finH + finM / 60) - (inicioH + inicioM / 60);

        if (horas <= 0) {
            return res.status(400).json({ success: false, message: "⛔ Horario no válido" });
        }

        const total = horas * cancha.precioHora;

        // Crear reserva
        const newReserva = new Reserva({
            fecha,
            horaInicio,
            horaFin,
            total,
            estado: estado || "confirmada",
            user: usuario._id,
            cancha: cancha._id
        });

        const savedReserva = await newReserva.save();

        const reservaCompleta = await Reserva.findById(savedReserva._id)
            .populate("user")
            .populate("cancha");

        // Notificación externa (opcional)
    

        return res.status(201).json({
            success: true,
            message: "✅ Reserva creada correctamente.",
            data: reservaCompleta
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "❌ Error al crear la reserva.",
            error: error.message
        });
    }
};


// Eliminar una reserva
export const deleteReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndDelete(req.params.id);

        if (!reserva) {
            return res.status(404).json({
                success: false,
                message: "❌ Reserva no encontrada."
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Reserva eliminada exitosamente.",
            data: reserva
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al eliminar la reserva.",
            error: error.message
        });
    }
};

export const updateReserva = async (req, res) => {
  try {
    const { fecha, horaInicio, horaFin } = req.body;
    const { id } = req.params;

    const reserva = await Reserva.findById(id);
    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: "❌ Reserva no encontrada"
      });
    }

    const cancha = await Cancha.findById(reserva.cancha);
    if (!cancha) {
      return res.status(404).json({
        success: false,
        message: "❌ Cancha no encontrada"
      });
    }

    // Validar horario dentro del rango
    const apertura = parseInt(cancha.horarioApertura.split(":")[0]);
    const cierre = parseInt(cancha.horarioCierre.split(":")[0]);
    const inicio = parseInt(horaInicio.split(":")[0]);
    const fin = parseInt(horaFin.split(":")[0]);

    if (inicio < apertura || fin > cierre || inicio >= fin) {
      return res.status(400).json({
        success: false,
        message: "⛔ Horario fuera del rango permitido"
      });
    }

    // Verificar conflictos (excluyendo esta reserva)
    const conflicto = await Reserva.findOne({
      _id: { $ne: id },
      cancha: reserva.cancha,
      fecha: new Date(fecha),
      $or: [
        { horaInicio: { $lt: horaFin }, horaFin: { $gt: horaInicio } }
      ],
      estado: { $in: ["pendiente", "confirmada"] }
    });

    if (conflicto) {
      return res.status(400).json({
        success: false,
        message: "⛔ Ya existe otra reserva en ese horario"
      });
    }

    // Recalcular total
    const [iH, iM] = horaInicio.split(":").map(Number);
    const [fH, fM] = horaFin.split(":").map(Number);
    const horas = (fH + fM / 60) - (iH + iM / 60);

    const total = horas * cancha.precioHora;

    reserva.fecha = fecha;
    reserva.horaInicio = horaInicio;
    reserva.horaFin = horaFin;
    reserva.total = total;

    await reserva.save();

    const reservaActualizada = await Reserva.findById(id)
      .populate("user")
      .populate("cancha");

    return res.status(200).json({
      success: true,
      message: "✅ Reserva actualizada correctamente",
      data: reservaActualizada
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "❌ Error al actualizar la reserva",
      error: error.message
    });
  }
};


// Consultar disponibilidad de cancha
export const getDisponibilidadCancha = async (req, res) => {
    try {
        const canchaId = req.params.id;
        const { fecha } = req.query;

        if (!fecha) {
            return res.status(400).json({ success: false, message: "Debe proporcionar una fecha en formato YYYY-MM-DD" });
        }

        const cancha = await Cancha.findById(canchaId);
        if (!cancha) {
            return res.status(404).json({ success: false, message: "Cancha no encontrada" });
        }

        const reservas = await Reserva.find({
            cancha: canchaId,
            fecha: { $gte: new Date(`${fecha}T00:00:00`), $lte: new Date(`${fecha}T23:59:59`) }
        });

        const horasDisponibles = [];
        const [hApertura] = cancha.horarioApertura.split(":").map(Number);
        const [hCierre] = cancha.horarioCierre.split(":").map(Number);

        for (let h = hApertura; h < hCierre; h++) {
            const horaInicio = `${h.toString().padStart(2, "0")}:00`;
            const horaFin = `${(h + 1).toString().padStart(2, "0")}:00`;

            const ocupada = reservas.some(r =>
                (r.horaInicio < horaFin && r.horaFin > horaInicio)
            );

            if (!ocupada) horasDisponibles.push({ horaInicio, horaFin });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Horarios disponibles obtenidos correctamente.",
            cancha: cancha.nombre,
            fecha,
            disponibilidad: horasDisponibles
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al obtener la disponibilidad.",
            error: error.message
        });
    }
};