import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);
<<<<<<< Updated upstream
=======

router.post("/logout", logout);
>>>>>>> Stashed changes

router.post("/logout", logout);

export default router;
