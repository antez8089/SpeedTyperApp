import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (token) => {
        Cookies.set('token', token, {path: '/'})
        const userData = jwtDecode(token);
        setToken(token);
        setUserData(userData);
        setIsAuthenticated(true);
    }

    const logout = () => {
        Cookies.remove('token', { path: '/' });
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ token, userData, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);