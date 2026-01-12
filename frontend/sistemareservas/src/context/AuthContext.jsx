import { createContext, useState, useContext, useEffect } from "react";
import { 
    iniciosesion,
    actualizarUsuario,
    cerrarSesion,
    obtenerPerfil,
    obtenerUsuarios,
    registro
} from "../api/Autenticacion";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const registroUsuario = async (userData) => {
        try {
            const res = await registro(userData);
            setUser(res.data.user);
            setIsAuthenticated(true);
            setErrors([]);
            return res.data;
        } catch (error) {
            setErrors(
                error.response?.data?.message
                    ? [error.response.data.message]
                    : ["Error al registrar el usuario"]
            );
            throw error;
        }
    };

    const iniciodesesion = async (user) => {
        try {
            const res = await iniciosesion(user);
            setIsAuthenticated(true);
            setUser(res.data.user);
            setErrors([]);
        } catch (error) {
            setErrors(
                error.response?.data?.message
                    ? [error.response.data.message]
                    : ["Error al iniciar sesión"]
            );
        }
    };

    const cerrarSesionUsuario = async () => {
        try {
            await cerrarSesion();
            Cookies.remove("token");
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    // Verificar token al cargar la app
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await obtenerPerfil();
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data.user);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider
            value={{
                iniciodesesion,
                registroUsuario,
                cerrarSesionUsuario,
                user,
                errors,
                isAuthenticated,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};