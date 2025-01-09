import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthFormData {
  email: string;
  password: string;
}

export function useAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (data: AuthFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: authError } = isRegistering
        ? await supabase.auth.signUp({
            email: data.email,
            password: data.password,
          })
        : await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

      if (authError) throw authError;

    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message === 'Invalid login credentials' 
        ? 'Email o contraseña incorrectos'
        : 'Error en la autenticación. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    isRegistering,
    setIsRegistering,
    handleAuth
  };
}