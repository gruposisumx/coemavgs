import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuthForm } from '../hooks/useAuthForm';

export function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, isRegistering, setIsRegistering, handleAuth } = useAuthForm();

  React.useEffect(() => {
    if (user) {
      navigate('/perfil');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-primary-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Crea tu cuenta' : 'Bienvenida de nuevo'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegistering 
              ? 'Únete a nuestra comunidad de apoyo'
              : 'Inicia sesión para acceder a tu cuenta'}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <AuthForm
          onSubmit={handleAuth}
          isLoading={isLoading}
          isRegistering={isRegistering}
          onToggleMode={() => setIsRegistering(!isRegistering)}
        />
      </div>
    </div>
  );
}