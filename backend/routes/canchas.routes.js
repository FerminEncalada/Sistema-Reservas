import { Router } from "express";
import {
  getCanchas,
  getCancha,
  createCancha,
  updateCancha,
  deleteCancha
} from "../controllers/canchas.controller.js";
import { upload } from "../middlewares/upload.js";
import { authRequired } from "../middlewares/validateToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

// listar canchas → PÚBLICO (sin autenticación)
router.get("/canchas", getCanchas);

// ver una cancha → PÚBLICO (sin autenticación)
router.get("/canchas/:id", getCancha);

// crear cancha → solo admin
router.post(
  "/canchas",
  authRequired,
  isAdmin,
  upload.array("fotos", 5),
  createCancha
);

// ✅ editar cancha → solo admin (con soporte para fotos)
router.put(
  "/canchas/:id", 
  authRequired, 
  isAdmin, 
  upload.array("fotos", 5), // ✅ Añadir soporte para fotos
  updateCancha
);

// eliminar cancha → solo admin
router.delete("/canchas/:id", authRequired, isAdmin, deleteCancha);

export default router;