// AuthContext

import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Ajout de l'état isAdmin

    const login = useCallback(async (userCredentials) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', userCredentials);
            if (response.data.accessToken && response.data.id) {
                const { accessToken, id, name, admin } = response.data;
    
                localStorage.setItem('token', accessToken);
                localStorage.setItem('userId', id.toString());
                console.log('User ID set in localStorage:', id);
    
                setUser({ id, name });
                setIsAdmin(admin);
    
                console.log('Login successful:', { id, name, accessToken, admin });
                return true;
            } else {
                console.error('Login failed: Missing token or user ID');
                alert('Login failed: Missing essential data');
                return false;
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Incorrect email or password');
            return false;
        }
    }, []);
    
    
    
    

    const logout = useCallback(() => {
        localStorage.removeItem('token'); // Nettoyer le token stocké lors de la déconnexion
        setUser(null); // Réinitialiser l'état de l'utilisateur
        setIsAdmin(false); // Réinitialiser le statut d'administrateur
        console.log('User logged out successfully');
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
