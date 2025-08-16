import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { loginUser, registerUser } from '../api/auth';

interface AuthContextType {
  user: any; // Ideally, define a more specific User type
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string, role_name: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: () => boolean;
  userRole: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedUserInfo = localStorage.getItem('user_info');
    if (storedToken && storedUserInfo) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUserInfo));
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
        // Clear invalid storage if parsing fails
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      const { access_token, refresh_token, user_info } = data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user_info', JSON.stringify(user_info)); // Store user_info
      setToken(access_token);
      setUser(user_info); // Assuming user_info is returned by login
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role_name: string) => {
    try {
      const data = await registerUser(name, email, password, role_name);
      // No direct login after register for now, user needs to login
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info'); // Remove user_info on logout
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = (): boolean => {
    return !!token && !!user; // Ensure both token and user object exist
  };

  const userRole = user ? user.role : 'Guest'; // Get user role from state

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
