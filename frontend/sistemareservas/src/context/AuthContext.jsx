import { createContext, useState, useContext, useEffect } from "react";
import { iniciosesion,actualizarUsuario,cerrarSesion,eliminarUsuario,obtenerPerfil,obtenerUsuarios,registro
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

    setUser(res.data.user); // 👈 clave
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
        console.log(res);
        setIsAuthenticated(true);
        setUser(res.data);
    } catch (error) {
        console.log(error);

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

    return (
        <AuthContext.Provider
            value={{
            iniciodesesion,
            registroUsuario,
            cerrarSesionUsuario,
            user,
            errors,
            isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};