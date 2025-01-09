import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const resourceSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  type: z.enum(['text', 'video', 'audio', 'image']),
  category: z.string().min(1, 'Selecciona una categoría'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  url: z.string().url('Ingresa una URL válida'),
  status: z.enum(['visible', 'hidden'])
});

type ResourceFormData = z.infer<typeof resourceSchema>;

export function ResourceEditor() {
  const { register, handleSubmit, formState: { errors } } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema)
  });

  const onSubmit = async (data: ResourceFormData) => {
    try {
      const { error } = await supabase.from('staff_resources').insert(data);
      if (error) throw error;
      alert('Recurso creado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el recurso');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        error={errors.title?.message}
        {...register('title')}
      />

      <Select
        label="Tipo de recurso"
        error={errors.type?.message}
        options={[
          { value: 'text', label: 'Texto' },
          { value: 'video', label: 'Video' },
          { value: 'audio', label: 'Audio' },
          { value: 'image', label: 'Imagen' }
        ]}
        {...register('type')}
      />

      <Select
        label="Categoría"
        error={errors.category?.message}
        options={[
          { value: 'meditation', label: 'Meditación' },
          { value: 'therapy', label: 'Terapia' },
          { value: 'support', label: 'Apoyo' }
        ]}
        {...register('category')}
      />

      <Input
        label="URL del recurso"
        error={errors.url?.message}
        {...register('url')}
      />

      <Select
        label="Estado"
        error={errors.status?.message}
        options={[
          { value: 'visible', label: 'Visible' },
          { value: 'hidden', label: 'Oculto' }
        ]}
        {...register('status')}
      />

      <Button type="submit">Crear Recurso</Button>
    </form>
  );
}