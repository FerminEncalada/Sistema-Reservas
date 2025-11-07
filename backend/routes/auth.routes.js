import { Router } from "express";
import { register, 
    login, 
    logout, 
    profile,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

router.get("/users", authRequired, isAdmin, getUsers);

router.put("/users/:id", authRequired, isAdmin, updateUser);

router.delete("/users/:id", authRequired, isAdmin, deleteUser);


export default router;