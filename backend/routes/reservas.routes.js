import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    getReservas, 
    getReserva, 
    createReserva, 
    updateReserva, 
    deleteReserva,
    getDisponibilidadCancha
} from "../controllers/reservas.controller.js";

const router = Router();

// Obtener todas las reservas del usuario autenticado
router.get("/reservas", authRequired, getReservas);

// Obtener una reserva específica
router.get("/reservas/:id", authRequired, getReserva);

// Crear nueva reserva
router.post("/reservas", authRequired, createReserva);

// Actualizar reserva
router.put("/reservas/:id", authRequired, updateReserva);

// Eliminar reserva
router.delete("/reservas/:id", authRequired, deleteReserva);

// Consultar disponibilidad de una cancha (ruta corregida)
router.get("/canchas/:id/disponibilidad", getDisponibilidadCancha);

export default router;