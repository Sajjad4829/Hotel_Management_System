import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Task 4 & 7: Initialize user and token from localStorage to survive page refresh immediately
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Synchronize both token and user data in localStorage on change
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  // Task 7: Verify session against backend on refresh to guarantee persistence & security
  const verifySession = useCallback(async () => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      // Calls GET /api/auth/profile using centralized api service
      const res = await api.get('/auth/profile');
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        setToken(savedToken);
      } else {
        throw new Error('Invalid session validation response');
      }
    } catch (error) {
      console.error('Session verification failed on refresh:', error?.response?.data?.message || error.message);
      // Purge invalid token and user from state and storage
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  /**
   * Task 3: Login authentication calling POST /api/auth/login via Axios api service
   */
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        // Save immediately in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return { success: true, user: res.data.user };
      }
      return { success: false, message: 'Unexpected login response.' };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Invalid email or password.',
      };
    }
  };

  /**
   * Task 2: Register account calling POST /api/auth/register via Axios api service
   */
  const register = async (fullName, email, phone, password) => {
    try {
      const res = await api.post('/auth/register', {
        fullName,
        email,
        phone,
        password,
      });
      if (res.data.success) {
        return { success: true, user: res.data.user };
      }
      return { success: false, message: 'Registration unsuccessful.' };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Registration failed. Email might already be registered.',
      };
    }
  };

  /**
   * Secure logout clearing token and user data from state and localStorage
   */
  const logout = async () => {
    try {
      if (token) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.warn('Backend logout notification warning:', error.message);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  /**
   * Update customer profile details calling PUT /api/auth/profile
   */
  const updateProfileData = async (fullName, phone) => {
    try {
      const res = await api.put('/auth/profile', { fullName, phone });
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return { success: true, user: res.data.user, message: res.data.message };
      }
      return { success: false, message: 'Unexpected response updating profile.' };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || 'Failed to update profile.' };
    }
  };

  /**
   * Change customer password calling PUT /api/auth/password
   */
  const changeUserPassword = async (currentPassword, newPassword) => {
    try {
      const res = await api.put('/auth/password', { currentPassword, newPassword });
      if (res.data.success) {
        return { success: true, message: res.data.message };
      }
      return { success: false, message: 'Unexpected response changing password.' };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || 'Failed to change password.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfileData,
        changeUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
