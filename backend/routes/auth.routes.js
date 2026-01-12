import { Router } from "express";
import { 
    register, 
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

// Rutas públicas
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Rutas protegidas - Usuario autenticado
router.get("/profile", authRequired, profile);

// Ruta para verificar el token (importante para mantener sesión)
router.get("/verify", authRequired, async (req, res) => {
    try {
        const User = (await import("../models/user.model.js")).default;
        const userFound = await User.findById(req.user.id).select("-password");
        
        if (!userFound) {
            return res.status(404).json({ 
                success: false,
                message: "Usuario no encontrado" 
            });
        }

        return res.json({
            success: true,
            user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                nombre: userFound.nombre,
                apellido: userFound.apellido,
                cedula: userFound.cedula,
                rol: userFound.rol
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: "Error al verificar token",
            error: error.message 
        });
    }
});

// Rutas protegidas - Solo admin
router.get("/users", authRequired, isAdmin, getUsers);
router.put("/users/:id", authRequired, updateUser);
router.delete("/users/:id", authRequired, isAdmin, deleteUser);

export default router;