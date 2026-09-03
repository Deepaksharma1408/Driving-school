import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../services/api';

export interface UserProfile {
  id: string;
  name?: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'student' | 'instructor' | 'admin';
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('stridedrive_jwt_token'));
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('stridedrive_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // On initial mount or refresh, if token exists, fetch fresh profile via GET /api/auth/me
  useEffect(() => {
    let isMounted = true;
    const rehydrateUser = async () => {
      const storedToken = localStorage.getItem('stridedrive_jwt_token');
      if (storedToken) {
        try {
          const res = await fetchCurrentUser(storedToken);
          if (isMounted) {
            if (res.success && res.user) {
              const freshUser: UserProfile = {
                id: res.user.id,
                name: res.user.name || res.user.fullName,
                fullName: res.user.fullName || res.user.name,
                email: res.user.email,
                phone: res.user.phone,
                role: res.user.role
              };
              setUser(freshUser);
              setToken(storedToken);
              localStorage.setItem('stridedrive_user', JSON.stringify(freshUser));
            } else {
              // Token expired or invalid
              setToken(null);
              setUser(null);
              localStorage.removeItem('stridedrive_jwt_token');
              localStorage.removeItem('stridedrive_user');
            }
          }
        } catch (err) {
          console.error('Failed to rehydrate user profile:', err);
        }
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };

    rehydrateUser();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('stridedrive_jwt_token', token);
    } else {
      localStorage.removeItem('stridedrive_jwt_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('stridedrive_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('stridedrive_user');
    }
  }, [user]);

  const login = (newToken: string, newUser: UserProfile) => {
    const normalizedUser: UserProfile = {
      id: newUser.id,
      name: newUser.name || newUser.fullName,
      fullName: newUser.fullName || newUser.name || 'User',
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role
    };
    setToken(newToken);
    setUser(normalizedUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('stridedrive_jwt_token');
    localStorage.removeItem('stridedrive_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
