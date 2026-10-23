import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Returns a guard for shopping actions (cart, wishlist).
 * For guests it redirects to sign-in, returning to the current page afterwards, and returns false.
 */
export const useRequireLogin = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (isAuthenticated) return true;
    navigate('/login', { state: { from: location.pathname } });
    return false;
  };
};

export default useRequireLogin;
