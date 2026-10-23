import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, accountApi } from '../services/scentoraApi';
import { tokenStorage } from '../services/api';
import AppStatusScreen from '../components/common/AppStatusScreen';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Only block the first render when there is a saved session to restore
  const [restoring, setRestoring] = useState(() => Boolean(tokenStorage.get()));

  useEffect(() => {
    if (!tokenStorage.get()) return;

    authApi
      .me()
      .then(setUser)
      .catch((error) => {
        // Expired or revoked token: forget it. Network errors keep it for the next reload.
        if (error.status === 401) tokenStorage.clear();
        console.warn('Could not restore session:', error.message);
      })
      .finally(() => setRestoring(false));
  }, []);

  const startSession = async (authCall) => {
    try {
      const { token, user: signedInUser } = await authCall();
      tokenStorage.set(token);
      setUser(signedInUser);
      return { success: true, user: signedInUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = (email, password) => startSession(() => authApi.login(email, password));

  const adminLogin = (email, password) => startSession(() => authApi.adminLogin(email, password));

  const register = (userData) => startSession(() => authApi.register(userData));

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
  };

  const updateProfile = async (fields) => {
    try {
      const updated = await accountApi.updateProfile(fields);
      setUser(updated);
      return { success: true, user: updated };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  if (restoring) return <AppStatusScreen message="Restoring your session…" />;

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
