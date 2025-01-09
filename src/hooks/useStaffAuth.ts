import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STAFF_PASSWORD = 'emma1122';
const STAFF_AUTH_KEY = 'staff_authenticated';

export function useStaffAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STAFF_AUTH_KEY) === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/staff/login');
    }
  }, [isAuthenticated, navigate]);

  const login = (password: string): boolean => {
    if (password === STAFF_PASSWORD) {
      localStorage.setItem(STAFF_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STAFF_AUTH_KEY);
    setIsAuthenticated(false);
    navigate('/staff/login');
  };

  return { isAuthenticated, login, logout };
}