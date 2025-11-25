
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: { [email: string]: { id: string, pass: string, role: 'user' | 'admin' } } = {
  'admin@tragetly.ai': { id: 'admin1', pass: 'admin123', role: 'admin' },
  'user@tragetly.ai': { id: 'user1', pass: 'user123', role: 'user' },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('tragetly-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    const foundUser = mockUsers[email];
    if (foundUser && foundUser.pass === pass) {
      const loggedInUser: User = { id: foundUser.id, email, role: foundUser.role };
      setUser(loggedInUser);
      localStorage.setItem('tragetly-user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, pass: string): Promise<boolean> => {
    if (mockUsers[email]) {
      return false; // User already exists
    }
    const newUser: User = { id: `user-${Date.now()}`, email, role: 'user' };
    mockUsers[email] = { ...newUser, pass };
    setUser(newUser);
    localStorage.setItem('tragetly-user', JSON.stringify(newUser));
    // In a real app, you would send a verification email here.
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tragetly-user');
  };
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
