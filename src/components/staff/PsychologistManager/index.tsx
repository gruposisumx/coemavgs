import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { supabase } from '../../../lib/supabase';

const psychologistSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  speciality: z.string().min(3, 'La especialidad es requerida'),
  experience_years: z.number().min(0, 'Los años de experiencia son requeridos'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  email: z.string().email('Email inválido'),
  profile_image: z.string().url('URL de imagen inválida')
});

type PsychologistForm = z.infer<typeof psychologistSchema>;

export function PsychologistManager() {
  const { register, handleSubmit, formState: { errors } } = useForm<PsychologistForm>({
    resolver: zodResolver(psychologistSchema)
  });

  const onSubmit = async (data: PsychologistForm) => {
    try {
      const { error } = await supabase.from('staff_professionals').insert(data);
      if (error) throw error;
      alert('Psicólogo registrado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar el psicólogo');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nombre"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Especialidad"
        error={errors.speciality?.message}
        {...register('speciality')}
      />

      <Input
        label="Años de experiencia"
        type="number"
        error={errors.experience_years?.message}
        {...register('experience_years', { valueAsNumber: true })}
      />

      <TextArea
        label="Descripción"
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="URL de imagen de perfil"
        error={errors.profile_image?.message}
        {...register('profile_image')}
      />

      <Button type="submit">Registrar Psicólogo</Button>
    </form>
  );
}