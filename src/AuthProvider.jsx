import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './TicketConfig'; // Ensure you have initialized Firebase
import { signInWithPopup, signOut, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Google login
    const loginWithGoogle = async () => {
        setError(null);
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message);
        }
    };

    // Email and password login
    const loginWithEmail = async (email, password) => {
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            throw err; // Rethrow the error for the component to handle it
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
        }
    };

    const PrivateRoute = ({ element }) => {
        return user ? element : <Navigate to="/login" />;
    };

    return (
        <AuthContext.Provider value={{ user, login: loginWithGoogle, logout, loading, error, loginWithEmail, PrivateRoute }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
