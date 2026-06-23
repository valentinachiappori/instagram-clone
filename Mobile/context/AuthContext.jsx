import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginService, registerService } from '../services/authService';
import { setUnauthorizedHandler } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // splash screen

        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Error cargando sesión', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const signUp = async (email, name, password, image) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await registerService(email, name, password, image);
      if (!data.token) throw new Error('El servidor no devolvió el token de sesión.');
      setToken(data.token);
      setUser(data.user);
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginService(email, password);
      if (!data.token) throw new Error('El servidor no devolvió el token de sesión.');
      setToken(data.token);
      setUser(data.user);
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  useEffect(() => {
    setUnauthorizedHandler(signOut);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, error, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
