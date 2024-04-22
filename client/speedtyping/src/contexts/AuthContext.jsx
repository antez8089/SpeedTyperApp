import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);


    const login = async (email, password) => {
        const body = JSON.stringify({
            email,
            password
        });
        try {
            const response = await api.post('/auth/sign-in', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.logged_in) {
                Cookies.set('access_token', response.data.token, {path: '/'});
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        Cookies.remove('access_token', { path: '/' });
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);