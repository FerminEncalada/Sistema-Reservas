import { createContext, useState, useContext, useEffect } from "react";
import { iniciosesion } from "../api/Autenticacion";
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

    return (
        <AuthContext.Provider
            value={{
             iniciodesesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};