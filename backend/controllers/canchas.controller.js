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

    // ✅ VALIDAR QUE LA HORA DE CIERRE SEA POSTERIOR A LA DE APERTURA
    const [horaApertura, minutoApertura] = horarioApertura.split(":").map(Number);
    const [horaCierre, minutoCierre] = horarioCierre.split(":").map(Number);
    
    const minutosApertura = horaApertura * 60 + minutoApertura;
    const minutosCierre = horaCierre * 60 + minutoCierre;

    if (minutosCierre <= minutosApertura) {
      return res.status(400).json({
        success: false,
        message: "❌ La hora de cierre debe ser posterior a la hora de apertura"
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
        const { id } = req.params;
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

        const cancha = await Cancha.findById(id);

        if (!cancha) {
            return res.status(404).json({
                success: false,
                message: "❌ Cancha no encontrada."
            });
        }

        // ✅ VALIDAR HORARIOS SI SE PROPORCIONAN
        if (horarioApertura && horarioCierre) {
          const [horaApertura, minutoApertura] = horarioApertura.split(":").map(Number);
          const [horaCierre, minutoCierre] = horarioCierre.split(":").map(Number);
          
          const minutosApertura = horaApertura * 60 + minutoApertura;
          const minutosCierre = horaCierre * 60 + minutoCierre;

          if (minutosCierre <= minutosApertura) {
            return res.status(400).json({
              success: false,
              message: "❌ La hora de cierre debe ser posterior a la hora de apertura"
            });
          }
        }

        // Actualizar campos básicos
        if (nombre) cancha.nombre = nombre;
        if (tipo) cancha.tipo = tipo;
        if (precioHora) cancha.precioHora = precioHora;
        if (estado) cancha.estado = estado;
        if (acronimo) cancha.acronimo = acronimo;
        if (horarioApertura) cancha.horarioApertura = horarioApertura;
        if (horarioCierre) cancha.horarioCierre = horarioCierre;

        // Actualizar ubicación si se proporcionan todos los datos
        if (direccion || lat || lng) {
          cancha.ubicacion = {
            direccion: direccion || cancha.ubicacion.direccion,
            lat: lat ? Number(lat) : cancha.ubicacion.lat,
            lng: lng ? Number(lng) : cancha.ubicacion.lng
          };
        }

        // Actualizar fotos si se envían nuevas
        if (req.files && req.files.length > 0) {
          const nuevasFotos = req.files.map(file => `/uploads/${file.filename}`);
          cancha.fotos = nuevasFotos;
        }

        const updatedCancha = await cancha.save();

        return res.status(200).json({
            success: true,
            message: "✅ Cancha actualizada exitosamente.",
            data: updatedCancha
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Error al actualizar la cancha.",
            error: error.message
        });
    }
};