import React from 'react';

interface Props {
  isRegistering: boolean;
  onToggle: () => void;
}

export function AuthToggle({ isRegistering, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="text-primary-600 hover:text-primary-700 text-sm"
    >
      {isRegistering 
        ? '¿Ya tienes cuenta? Inicia sesión'
        : '¿No tienes cuenta? Regístrate'}
    </button>
  );
}