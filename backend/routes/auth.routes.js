import { Router } from "express";
<<<<<<< HEAD
import { register, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);
=======
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);

router.post('/login', login);
>>>>>>> origin/develop

export default router;