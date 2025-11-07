import Cancha from "../models/cancha.model.js";

export const getCanchas = async (req, res) => {
    try {
        const canchas = await Cancha.find();

        return res.status(200).json({
            success: true,
            message: "✅ Canchas obtenidas correctamente.",
            total: canchas.length,
            data: canchas
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al obtener las canchas.",
            error: error.message
        });
    }
};


export const getCancha = async (req, res) => {
    try {
        const cancha = await Cancha.findById(req.params.id);

        if (!cancha) {
            return res.status(404).json({
                success: false,
                message: "❌ Cancha no encontrada."
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Cancha obtenida correctamente.",
            data: cancha
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al obtener la cancha.",
            error: error.message
        });
    }
};
export const createCancha = async (req, res) => {
    try {
        const { nombre, tipo, precioHora, estado, acronimo, ubicacion, fotos, horarioApertura, horarioCierre } = req.body;

        // Validar campos obligatorios
        if (!nombre || !tipo || !precioHora || !ubicacion || !ubicacion.direccion || !ubicacion.lat || !ubicacion.lng || !horarioApertura || !horarioCierre) {
            return res.status(400).json({
                success: false,
                message: "❌ Todos los campos son obligatorios."
            });
        }

        // Validar longitud mínima del nombre
        if (nombre.length < 10) {
            return res.status(400).json({
                success: false,
                message: "❌ El nombre debe tener mínimo 10 caracteres."
            });
        }

        // Validar precio
        if (precioHora <= 0) {
            return res.status(400).json({
                success: false,
                message: "❌ El precio por hora debe ser mayor a 0."
            });
        }

        // Validar formato del acrónimo (Primeras letras del nombre + número)
        // Ejemplo "Cancha Pepe 1" → CP1
        const palabras = nombre.split(" ");
        const letras = palabras.map(p => p[0].toUpperCase()).join(""); // CP de Cancha Pepe
        const regexAcronimo = new RegExp(`^${letras}[0-9]+$`);

        if (!regexAcronimo.test(acronimo)) {
            return res.status(400).json({
                success: false,
                message: `❌ Formato de acrónimo inválido. Debe ser: ${letras} + número (Ejemplo: ${letras}1)`
            });
        }

        // Verificar acrónimo único
        const acronimoExistente = await Cancha.findOne({ acronimo });
        if (acronimoExistente) {
            return res.status(400).json({
                success: false,
                message: "❌ El acrónimo ya está registrado. Use otro número."
            });
        }

        const nuevaCancha = new Cancha({
            nombre,
            tipo,
            precioHora,
            estado: estado || "disponible",
            acronimo,
            ubicacion,
            fotos: fotos || [],
            horarioApertura,
            horarioCierre
        });

        const savedCancha = await nuevaCancha.save();

        return res.status(201).json({
            success: true,
            message: "✅ Cancha registrada exitosamente.",
            data: savedCancha
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al crear la cancha.",
            error: error.message
        });
    }
};


export const deleteCancha = async (req, res) => {
    try {
        const cancha = await Cancha.findByIdAndDelete(req.params.id);

        if (!cancha) {
            return res.status(404).json({
                success: false,
                message: "❌ Cancha no encontrada."
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Cancha eliminada exitosamente.",
            data: cancha
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al eliminar la cancha.",
            error: error.message
        });
    }
};


export const updateCancha = async (req, res) => {
    try {
        const cancha = await Cancha.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!cancha) {
            return res.status(404).json({
                success: false,
                message: "❌ Cancha no encontrada."
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Cancha actualizada exitosamente.",
            data: cancha
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al actualizar la cancha.",
            error: error.message
        });
    }
};
