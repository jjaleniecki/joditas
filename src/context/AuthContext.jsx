import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // mientras chequea AsyncStorage al arrancar

    useEffect(() => {
        const cargarToken = async () => {
            try {
                const tokenGuardado = await AsyncStorage.getItem('token');
                if (tokenGuardado) {
                    setToken(tokenGuardado);
                }
            } catch (error) {
                console.error('Error leyendo token de AsyncStorage:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarToken();
    }, []);

    const login = async (nuevoToken) => {
        await AsyncStorage.setItem('token', nuevoToken);
        setToken(nuevoToken);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isLoggedIn: !!token,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el context fácil desde cualquier pantalla
export const useAuth = () => useContext(AuthContext);