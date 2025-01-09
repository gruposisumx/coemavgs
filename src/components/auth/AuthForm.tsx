import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, Lock } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GoogleAuthButton } from './GoogleAuthButton';

const authSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

type AuthFormData = z.infer<typeof authSchema>;

interface Props {
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading: boolean;
  isRegistering: boolean;
  onToggleMode: () => void;
}

export function AuthForm({ onSubmit, isLoading, isRegistering, onToggleMode }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema)
  });

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          icon={<Lock className="w-5 h-5 text-gray-400" />}
          label="Contraseña"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O continúa con</span>
        </div>
      </div>

      <GoogleAuthButton />

      <button
        type="button"
        onClick={onToggleMode}
        className="w-full text-sm text-primary-600 hover:text-primary-500"
      >
        {isRegistering 
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
}