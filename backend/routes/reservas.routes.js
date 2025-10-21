import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getReservas, 
    getReserva, 
    createReserva, 
    updateReserva, 
    deleteReserva 
} from "../controllers/reservas.controller.js";

const router = Router()

router.get("/reservas", authRequired, getReservas);

router.get("/reservas/:id", authRequired, getReserva);

router.post("/reservas", authRequired, createReserva);

router.delete("/reservas/:id", authRequired, deleteReserva);

router.put("/reservas/:id", authRequired, updateReserva);

export default router;