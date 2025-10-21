import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getCanchas, 
    getCancha, 
    createCancha, 
    updateCancha, 
    deleteCancha 
} from "../controllers/canchas.controller.js";

const router = Router()

router.get("/canchas", authRequired, getCanchas);

router.get("/canchas/:id", authRequired, getCancha);

router.post("/canchas", authRequired, createCancha);

router.delete("/canchas/:id", authRequired, deleteCancha);

router.put("/canchas/:id", authRequired, updateCancha);

export default router;
