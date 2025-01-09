import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

const profileSchema = z.object({
  full_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  phone: z.string().optional(),
  avatar_url: z.string().url().optional(),
  preferences: z.object({
    email_notifications: z.boolean(),
    appointment_reminders: z.boolean()
  })
});

type ProfileForm = z.infer<typeof profileSchema>;

export function ProfileEditor() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema)
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...data,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nombre completo"
        error={errors.full_name?.message}
        {...register('full_name')}
      />

      <Input
        label="Teléfono"
        type="tel"
        {...register('phone')}
      />

      <Input
        label="URL de avatar"
        error={errors.avatar_url?.message}
        {...register('avatar_url')}
      />

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('preferences.email_notifications')}
          />
          <span>Recibir notificaciones por email</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('preferences.appointment_reminders')}
          />
          <span>Recordatorios de citas</span>
        </label>
      </div>

      <Button type="submit">
        Actualizar perfil
      </Button>
    </form>
  );
}