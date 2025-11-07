import { Router } from "express";
import {
  getCanchas,
  getCancha,
  createCancha,
  updateCancha,
  deleteCancha
} from "../controllers/canchas.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

// listar canchas → cualquier usuario autenticado
router.get("/canchas", authRequired, getCanchas);

// ver una cancha → cualquier usuario autenticado
router.get("/canchas/:id", authRequired, getCancha);

// crear cancha → solo admin
router.post("/canchas", authRequired, isAdmin, createCancha);

// editar cancha → solo admin
router.put("/canchas/:id", authRequired, isAdmin, updateCancha);

// eliminar cancha → solo admin
router.delete("/canchas/:id", authRequired, isAdmin, deleteCancha);

export default router;
