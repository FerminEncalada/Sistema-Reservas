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
    const {
      nombre,
      tipo,
      precioHora,
      estado,
      acronimo,
      direccion,
      lat,
      lng,
      horarioApertura,
      horarioCierre
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "❌ Debe subir al menos una foto"
      });
    }

    const fotos = req.files.map(file => `/uploads/${file.filename}`);

    const ubicacion = {
      direccion,
      lat: Number(lat),
      lng: Number(lng)
    };

    const nuevaCancha = new Cancha({
      nombre,
      tipo,
      precioHora,
      estado: estado || "disponible",
      acronimo,
      ubicacion,
      fotos,
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
