export const isAdmin = (req, res, next) => {
    try {
        console.log("Usuario autenticado:", req.user, req.user.rol); // 👈
        if (req.user.rol !== "admin") {
            return res.status(403).json({
                success: false,
                message: "⛔ Acceso denegado. Solo administradores."
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al verificar permisos",
            error: error.message
        });
    }
};
export default isAdmin;