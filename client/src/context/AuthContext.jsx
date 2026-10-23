import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY_AUTH = 'scentora_demo_user_v1';

export const AuthProvider = ({ children }) => {
  // Demo user defaults to a signed-in demo customer so profile & order features are instantly accessible
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading stored user:', e);
    }
    // Default demo customer profile
    return {
      id: 'usr-demo-01',
      name: 'Aaditya Sharma',
      email: 'aaditya.sharma@example.com',
      phone: '+91 98765 43210',
      role: 'customer',
      address: {
        street: '42 Marine Drive, Nariman Point',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400021',
      },
      preferences: {
        fragranceFamily: 'Woody Oriental',
        newsletter: true,
      },
    };
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.warn('Could not persist user to localStorage', e);
    }
  }, [user]);

  const login = (email, password) => {
    const isMockAdmin = email.toLowerCase().includes('admin');
    const newUser = {
      id: `usr-${Date.now().toString(36)}`,
      name: isMockAdmin ? 'Scentora Administrator' : email.split('@')[0],
      email: email,
      role: isMockAdmin ? 'admin' : 'customer',
      phone: '+91 98765 43210',
      address: {
        street: '42 Marine Drive, Nariman Point',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400021',
      },
      preferences: {
        fragranceFamily: 'Woody Oriental',
        newsletter: true,
      },
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const adminLogin = (email = 'admin@scentora.com', password = 'admin') => {
    const adminUser = {
      id: 'usr-admin-01',
      name: 'Scentora Atelier Admin',
      email: email || 'admin@scentora.com',
      role: 'admin',
    };
    setUser(adminUser);
    return { success: true, user: adminUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `usr-${Date.now().toString(36)}`,
      name: userData.fullName || userData.name || 'Scentora Guest',
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      role: 'customer',
      address: {
        street: userData.street || '42 Marine Drive',
        city: userData.city || 'Mumbai',
        state: userData.state || 'Maharashtra',
        postalCode: userData.postalCode || '400021',
      },
      preferences: {
        fragranceFamily: 'All Families',
        newsletter: true,
      },
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (fields) => {
    setUser((prev) => (prev ? { ...prev, ...fields } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        adminLogin,
        register,
        logout,
        updateProfile,
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

export default AuthContext;
